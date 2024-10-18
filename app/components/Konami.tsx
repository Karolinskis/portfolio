"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function Konami() {
  const [index, setIndex] = useState<number>(0);
  const router = useRouter();

  const playChiptune = () => {
    const audioContext = new window.AudioContext();
    const notes = [
      { frequency: 440.0, duration: 0.1 }, // A4
      { frequency: 493.88, duration: 0.1 }, // B4
      { frequency: 523.25, duration: 0.1 }, // C5
      { frequency: 587.33, duration: 0.1 }, // D5
      { frequency: 659.25, duration: 0.1 }, // E5
    ];

    let currentTime = audioContext.currentTime;

    notes.forEach((note) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(note.frequency, currentTime);
      gainNode.gain.setValueAtTime(0.01, currentTime);

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start(currentTime);
      oscillator.stop(currentTime + note.duration);

      currentTime += note.duration;
    });

    setTimeout(() => {
      router.push("/arcade");
    }, currentTime * 2000);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === konamiCode[index]) {
        const newIndex = index + 1;
        setIndex(newIndex);
        if (newIndex === konamiCode.length) {
          playChiptune();
          setIndex(0);
        }
      } else {
        setIndex(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [index, router]);

  return null;
}
