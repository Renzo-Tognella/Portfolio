"use client";

import { useEffect, useRef } from "react";

export default function GSAPProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const registered = useRef(false);

  useEffect(() => {
    if (registered.current) return;
    registered.current = true;

    (async () => {
      const gsap = (await import("gsap")).default;
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;
      gsap.registerPlugin(ScrollTrigger);
    })();
  }, []);

  return <>{children}</>;
}
