import DonateForm from "@/components/DonateForm";
import { getLang } from "@/lib/i18n";

export default async function DonatePage() {
  const lang = await getLang();
  const en = lang === "en";

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-2xl font-bold text-neutral-900">{en ? "Donate" : "நன்கொடை"}</h1>
      <p className="mt-1 text-neutral-600">
        {en
          ? "Your contribution supports the movement's legal, RTI and community work."
          : "உங்கள் நன்கொடை இயக்கத்தின் சட்ட, தகவல் அறியும் உரிமை மற்றும் சமூக பணிகளுக்கு பயன்படும்."}
      </p>
      <div className="mt-6">
        <DonateForm lang={lang} />
      </div>
    </div>
  );
}
