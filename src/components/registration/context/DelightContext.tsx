/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import { GREETINGS, PRAISE } from '../data/content';

export interface ConfettiApi {
  burst: (x: number, y: number, count: number) => void;
  rain: (count: number) => void;
}

interface DelightValue {
  /** What the doctors are currently saying. */
  message: string;
  /** Changes every time a message is shown, to replay the bubble animation. */
  messageKey: number;
  /** Changes every time the doctors cheer, to replay their little jump. */
  cheerKey: number;
  say: (message: string) => void;
  /** Encouraging message + doctors jump. Throttled unless `force` is true. */
  cheer: (message?: string, force?: boolean) => void;
  /** Nudge the left-panel particles. */
  poke: (amount: number) => void;
  burst: (x: number, y: number, count: number) => void;
  rain: (count: number) => void;
  registerPoke: (fn: ((amount: number) => void) | null) => void;
  registerConfetti: (api: ConfettiApi | null) => void;
}

const DelightContext = createContext<DelightValue | null>(null);

export function DelightProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState(GREETINGS[0]);
  const [messageKey, setMessageKey] = useState(0);
  const [cheerKey, setCheerKey] = useState(0);
  const lastCheer = useRef(0);
  const pokeRef = useRef<((amount: number) => void) | null>(null);
  const confettiRef = useRef<ConfettiApi | null>(null);

  const say = useCallback((m: string) => {
    setMessage(m);
    setMessageKey((k) => k + 1);
  }, []);

  const cheer = useCallback(
    (m?: string, force = false) => {
      const now = Date.now();
      if (!force && now - lastCheer.current < 1800) return;
      lastCheer.current = now;
      say(m ?? PRAISE[Math.floor(Math.random() * PRAISE.length)]);
      setCheerKey((k) => k + 1);
    },
    [say],
  );

  const poke = useCallback((amount: number) => pokeRef.current?.(amount), []);
  const burst = useCallback((x: number, y: number, count: number) => confettiRef.current?.burst(x, y, count), []);
  const rain = useCallback((count: number) => confettiRef.current?.rain(count), []);
  const registerPoke = useCallback((fn: ((amount: number) => void) | null) => {
    pokeRef.current = fn;
  }, []);
  const registerConfetti = useCallback((api: ConfettiApi | null) => {
    confettiRef.current = api;
  }, []);

  const value = useMemo<DelightValue>(
    () => ({ message, messageKey, cheerKey, say, cheer, poke, burst, rain, registerPoke, registerConfetti }),
    [message, messageKey, cheerKey, say, cheer, poke, burst, rain, registerPoke, registerConfetti],
  );

  return <DelightContext.Provider value={value}>{children}</DelightContext.Provider>;
}

export function useDelight(): DelightValue {
  const ctx = useContext(DelightContext);
  if (!ctx) throw new Error('useDelight must be used inside <DelightProvider>');
  return ctx;
}

/** Feedback for picking an option: particles twitch, and the doctors cheer when something real is chosen. */
export function useChoiceFeedback() {
  const { poke, cheer } = useDelight();
  return useCallback(
    (selectedNow: boolean, isOther = false) => {
      poke(30);
      if (selectedNow && !isOther) cheer();
    },
    [poke, cheer],
  );
}
