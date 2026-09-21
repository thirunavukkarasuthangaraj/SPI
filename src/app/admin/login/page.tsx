import LoginForm from "./LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex max-w-sm flex-col px-4 py-16">
      <h1 className="text-xl font-bold text-neutral-900">நிர்வாக உள்நுழைவு</h1>
      <p className="mt-1 text-sm text-neutral-500">
        செய்திகள், கருத்தாக்கம் மற்றும் நாளாந்த செயல்பாடுகளை பதிவிட உள்நுழையவும்.
      </p>
      <LoginForm />
    </div>
  );
}
