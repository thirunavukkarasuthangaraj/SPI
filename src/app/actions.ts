"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { createSession, destroySession, getSessionAdminId, verifyPassword } from "@/lib/auth";
import { slugify } from "@/lib/posts";
import { LANG_COOKIE, type Lang } from "@/lib/i18n";
import type { PostCategory } from "@/generated/prisma/client";

export type ActionState = { error?: string } | undefined;

export async function setLangAction(formData: FormData) {
  const lang = String(formData.get("lang") ?? "ta") as Lang;
  const path = String(formData.get("path") ?? "/");
  const cookieStore = await cookies();
  cookieStore.set(LANG_COOKIE, lang === "en" ? "en" : "ta", {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  redirect(path);
}

async function requireAdmin() {
  const adminId = await getSessionAdminId();
  if (!adminId) redirect("/admin/login");
  return adminId;
}

export async function loginAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "மின்னஞ்சல் மற்றும் கடவுச்சொல்லை உள்ளிடவும்." };
  }

  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) {
    return { error: "தவறான மின்னஞ்சல் அல்லது கடவுச்சொல்." };
  }

  const valid = await verifyPassword(password, admin.passwordHash);
  if (!valid) {
    return { error: "தவறான மின்னஞ்சல் அல்லது கடவுச்சொல்." };
  }

  await createSession(admin.id);
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

function readPostFields(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const category = String(formData.get("category") ?? "NEWS") as PostCategory;
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const eventDateRaw = String(formData.get("eventDate") ?? "").trim();
  const published = formData.get("published") === "on";
  const slugInput = String(formData.get("slug") ?? "").trim();

  return { title, category, excerpt, content, eventDateRaw, published, slugInput };
}

export async function createPostAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();

  const { title, category, excerpt, content, eventDateRaw, published, slugInput } = readPostFields(formData);

  if (!title || !content) {
    return { error: "தலைப்பு மற்றும் உள்ளடக்கம் அவசியம்." };
  }

  const baseSlug = slugify(slugInput || title);
  let slug = baseSlug;
  let attempt = 1;
  while (await prisma.post.findUnique({ where: { slug } })) {
    attempt += 1;
    slug = `${baseSlug}-${attempt}`;
  }

  await prisma.post.create({
    data: {
      title,
      slug,
      category,
      excerpt: excerpt || null,
      content,
      eventDate: eventDateRaw ? new Date(eventDateRaw) : new Date(),
      published,
    },
  });

  revalidatePath("/");
  revalidatePath("/news");
  revalidatePath("/blog");
  revalidatePath("/activity");
  redirect("/admin");
}

export async function updatePostAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const { title, category, excerpt, content, eventDateRaw, published } = readPostFields(formData);

  if (!id || !title || !content) {
    return { error: "தலைப்பு மற்றும் உள்ளடக்கம் அவசியம்." };
  }

  await prisma.post.update({
    where: { id },
    data: {
      title,
      category,
      excerpt: excerpt || null,
      content,
      eventDate: eventDateRaw ? new Date(eventDateRaw) : new Date(),
      published,
    },
  });

  revalidatePath("/");
  revalidatePath("/news");
  revalidatePath("/blog");
  revalidatePath("/activity");
  redirect("/admin");
}

export async function recordDonationAction(input: {
  name: string;
  email: string;
  phone: string;
  amount: number;
  paymentId: string;
}) {
  const name = input.name.trim();
  const email = input.email.trim();
  const phone = input.phone.trim();
  const amount = Math.floor(input.amount);
  const paymentId = input.paymentId.trim();

  if (!name || !email || !paymentId || !Number.isFinite(amount) || amount <= 0) {
    return { ok: false as const, error: "invalid donation payload" };
  }

  await prisma.donation.upsert({
    where: { razorpayPaymentId: paymentId },
    update: {},
    create: { name, email, phone: phone || null, amount, razorpayPaymentId: paymentId, status: "PAID" },
  });

  revalidatePath("/admin/donations");
  return { ok: true as const };
}

export async function deletePostAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) {
    await prisma.post.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/news");
    revalidatePath("/blog");
    revalidatePath("/activity");
  }
  redirect("/admin");
}
