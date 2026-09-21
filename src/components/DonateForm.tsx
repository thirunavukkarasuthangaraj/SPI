"use client";

import { useState } from "react";
import Script from "next/script";
import { recordDonationAction } from "@/app/actions";
import type { Lang } from "@/lib/i18n";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (resp: unknown) => void) => void;
    };
  }
}

const CHIPS = [100, 500, 1000, 2500, 5000];
const MIN_AMOUNT = 10;
const MAX_AMOUNT = 2000000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function DonateForm({ lang }: { lang: Lang }) {
  const en = lang === "en";
  const [amount, setAmount] = useState<number | "">(500);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);
  const [success, setSuccess] = useState<{ amount: number; paymentId: string } | null>(null);
  const [scriptReady, setScriptReady] = useState(false);

  const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

  function fmt(n: number) {
    return "₹" + n.toLocaleString("en-IN");
  }

  function validate(): string | null {
    if (!name.trim()) return en ? "Please enter your name." : "தயவுசெய்து பெயரை உள்ளிடவும்.";
    if (!EMAIL_RE.test(email)) return en ? "Please enter a valid email." : "சரியான மின்னஞ்சலை உள்ளிடவும்.";
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) return en ? "Please enter a valid 10-digit phone number." : "சரியான 10 இலக்க தொலைபேசி எண்ணை உள்ளிடவும்.";
    const amt = Number(amount);
    if (!amt || amt < MIN_AMOUNT) return en ? `Minimum donation is ${fmt(MIN_AMOUNT)}.` : `குறைந்தபட்ச நன்கொடை ${fmt(MIN_AMOUNT)}.`;
    if (amt > MAX_AMOUNT) return en ? `Maximum online donation is ${fmt(MAX_AMOUNT)}.` : `அதிகபட்ச நன்கொடை ${fmt(MAX_AMOUNT)}.`;
    return null;
  }

  function handlePay() {
    setError(null);
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    if (!key) {
      setError(en ? "Payments are not configured yet." : "பணம் செலுத்தும் வசதி இன்னும் அமைக்கப்படவில்லை.");
      return;
    }
    if (!scriptReady || !window.Razorpay) {
      setError(en ? "Payment gateway is still loading, please try again." : "பணம் செலுத்தும் வசதி ஏற்றப்படுகிறது, மீண்டும் முயற்சிக்கவும்.");
      return;
    }

    const amt = Number(amount);
    setPaying(true);

    const rzp = new window.Razorpay({
      key,
      amount: Math.round(amt * 100),
      currency: "INR",
      name: en ? "Satta Panchayat Iyakkam" : "சட்ட பஞ்சாயத்து இயக்கம்",
      description: en ? "Donation to support the movement" : "இயக்கத்திற்கான நன்கொடை",
      prefill: { name, email, contact: phone },
      notes: { purpose: "Donation" },
      theme: { color: "#1d4ed8" },
      handler: async (response: unknown) => {
        const paymentId = (response as { razorpay_payment_id?: string }).razorpay_payment_id ?? "";
        await recordDonationAction({ name, email, phone, amount: amt, paymentId });
        setSuccess({ amount: amt, paymentId });
        setPaying(false);
      },
      modal: {
        ondismiss: () => setPaying(false),
      },
    });

    rzp.on("payment.failed", (resp: unknown) => {
      const description = (resp as { error?: { description?: string } })?.error?.description;
      setError(description || (en ? "Payment failed, please try again." : "பணம் செலுத்துதல் தோல்வியடைந்தது, மீண்டும் முயற்சிக்கவும்."));
      setPaying(false);
    });

    rzp.open();
  }

  if (success) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-8 text-center">
        <div className="text-4xl">🌱</div>
        <h2 className="mt-3 text-xl font-bold text-green-800">
          {en ? `Thank you, ${name}!` : `நன்றி, ${name}!`}
        </h2>
        <p className="mt-2 text-green-700">
          {en
            ? `Your donation of ${fmt(success.amount)} was successful.`
            : `உங்கள் ${fmt(success.amount)} நன்கொடை வெற்றிகரமாக பதிவானது.`}
        </p>
        <p className="mt-1 text-xs text-green-600">
          {en ? "Payment reference" : "பணம் செலுத்திய குறிப்பு"}: {success.paymentId}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onReady={() => setScriptReady(true)}
        onLoad={() => setScriptReady(true)}
      />

      <label className="block text-sm font-medium text-neutral-700">
        {en ? "Amount" : "தொகை"}
      </label>
      <div className="mt-2 flex flex-wrap gap-2">
        {CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => setAmount(chip)}
            className={`rounded-md border px-3 py-1.5 text-sm font-medium ${
              amount === chip
                ? "border-brand bg-brand text-white"
                : "border-neutral-300 text-neutral-700 hover:border-brand"
            }`}
          >
            {fmt(chip)}
          </button>
        ))}
      </div>
      <input
        type="number"
        min={MIN_AMOUNT}
        value={amount}
        onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
        className="mt-3 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
        placeholder={en ? "Custom amount (₹)" : "தொகையை உள்ளிடவும் (₹)"}
      />

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-neutral-700">{en ? "Name" : "பெயர்"}</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700">{en ? "Phone" : "தொலைபேசி"}</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
          />
        </div>
      </div>
      <div className="mt-3">
        <label className="block text-sm font-medium text-neutral-700">{en ? "Email" : "மின்னஞ்சல்"}</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
        />
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <button
        type="button"
        onClick={handlePay}
        disabled={paying}
        className="mt-5 w-full rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
      >
        {paying
          ? en
            ? "Processing…"
            : "செயலாக்கம் நடைபெறுகிறது…"
          : en
            ? `Donate ${amount ? fmt(Number(amount)) : ""}`
            : `நன்கொடை செலுத்து ${amount ? fmt(Number(amount)) : ""}`}
      </button>
    </div>
  );
}
