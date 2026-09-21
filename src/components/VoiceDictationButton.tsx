"use client";

import { useEffect, useRef, useState } from "react";

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: unknown) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: unknown) => void) | null;
};

type SpeechEventResult = {
  resultIndex: number;
  results: {
    length: number;
    [index: number]: { isFinal: boolean; [index: number]: { transcript: string } };
  };
};

export default function VoiceDictationButton({
  targetId,
  lang = "ta-IN",
}: {
  targetId: string;
  lang?: string;
}) {
  const [supported, setSupported] = useState(true);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    const w = window as unknown as {
      SpeechRecognition?: new () => SpeechRecognitionLike;
      webkitSpeechRecognition?: new () => SpeechRecognitionLike;
    };
    const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!Ctor) {
      setSupported(false);
      return;
    }

    const recognition = new Ctor();
    recognition.lang = lang;
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const e = event as SpeechEventResult;
      const textarea = document.getElementById(targetId) as HTMLTextAreaElement | null;
      if (!textarea) return;

      let finalTranscript = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const result = e.results[i];
        if (result.isFinal) finalTranscript += result[0].transcript;
      }

      if (finalTranscript) {
        const needsSpace = textarea.value.length > 0 && !textarea.value.endsWith("\n") && !textarea.value.endsWith(" ");
        textarea.value += (needsSpace ? " " : "") + finalTranscript.trim();
        textarea.dispatchEvent(new Event("input", { bubbles: true }));
      }
    };

    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetId, lang]);

  if (!supported) return null;

  function toggle() {
    const recognition = recognitionRef.current;
    if (!recognition) return;
    if (listening) {
      recognition.stop();
      setListening(false);
    } else {
      recognition.start();
      setListening(true);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition ${
        listening
          ? "border-red-300 bg-red-50 text-red-700"
          : "border-neutral-300 bg-white text-neutral-600 hover:border-brand hover:text-brand"
      }`}
    >
      <span className={`h-2 w-2 rounded-full ${listening ? "animate-pulse bg-red-600" : "bg-neutral-400"}`} />
      {listening ? "கேட்கிறது… (நிறுத்த சொடுக்கவும்)" : "🎙 குரல் மூலம் உள்ளிடவும்"}
    </button>
  );
}
