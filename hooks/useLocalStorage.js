"use client";

export default function useLocalStorage(key) {
  const get = () => localStorage.getItem(key);
  const set = (value) => localStorage.setItem(key, value);

  return { get, set };
}
