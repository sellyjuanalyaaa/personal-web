"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = "14, 165, 233";
const MOBILE_BREAKPOINT = 768;

const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement("div");
  el.className = "magic-bento-particle";
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 9999px;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 30;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

const MagicBento = ({
  children,
  className = "",
  textAutoHide = true,
  enableStars = false,
  enableSpotlight = true,
  enableBorderGlow = true,
  enableTilt = false,
  enableMagnetism = false,
  clickEffect = true,
  spotlightRadius = 400,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  disableAnimations = false,
}) => {
  const cardRef = useRef(null);
  const spotlightRef = useRef(null);
  const particlesRef = useRef([]);
  const particlesInitialized = useRef(false);
  const seededParticles = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const isMobile = useMobileDetection();

  const shouldDisableAnimations = disableAnimations || isMobile;

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    seededParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * rect.width, Math.random() * rect.height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.2,
        ease: "power2.out",
        onComplete: () => particle.remove(),
      });
    });

    particlesRef.current = [];
  }, []);

  const spawnParticles = useCallback(() => {
    if (!enableStars || shouldDisableAnimations || !cardRef.current) return;
    initializeParticles();

    seededParticles.current.forEach((seed, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const particle = seed.cloneNode(true);
        cardRef.current.appendChild(particle);
        particlesRef.current.push(particle);

        gsap.fromTo(
          particle,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.25, ease: "power2.out" }
        );

        gsap.to(particle, {
          x: (Math.random() - 0.5) * 60,
          y: (Math.random() - 0.5) * 60,
          duration: 1.6 + Math.random(),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }, index * 80);

      timeoutsRef.current.push(timeoutId);
    });
  }, [enableStars, initializeParticles, shouldDisableAnimations]);

  useEffect(() => {
    if (!cardRef.current) return;

    const element = cardRef.current;

    const onMouseEnter = () => {
      isHoveredRef.current = true;
      spawnParticles();

      if (!shouldDisableAnimations && enableTilt) {
        gsap.to(element, {
          rotateX: 3,
          rotateY: 3,
          duration: 0.2,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }
    };

    const onMouseMove = (event) => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableSpotlight && spotlightRef.current) {
        spotlightRef.current.style.opacity = shouldDisableAnimations ? "0" : "1";
        spotlightRef.current.style.background = `radial-gradient(${spotlightRadius}px circle at ${x}px ${y}px, rgba(${glowColor}, 0.22), rgba(${glowColor}, 0.12) 30%, transparent 65%)`;
      }

      if (shouldDisableAnimations) return;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        gsap.to(element, { rotateX, rotateY, duration: 0.1, ease: "power2.out", transformPerspective: 1000 });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.03;
        const magnetY = (y - centerY) * 0.03;
        gsap.to(element, { x: magnetX, y: magnetY, duration: 0.2, ease: "power2.out" });
      }
    };

    const onMouseLeave = () => {
      isHoveredRef.current = false;
      clearParticles();

      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = "0";
      }

      gsap.to(element, {
        rotateX: 0,
        rotateY: 0,
        x: 0,
        y: 0,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    const onClick = (event) => {
      if (!clickEffect || shouldDisableAnimations) return;

      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const radius = Math.max(rect.width, rect.height);

      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: absolute;
        left: ${x - radius}px;
        top: ${y - radius}px;
        width: ${radius * 2}px;
        height: ${radius * 2}px;
        border-radius: 9999px;
        pointer-events: none;
        z-index: 25;
        background: radial-gradient(circle, rgba(${glowColor}, 0.35) 0%, rgba(${glowColor}, 0.14) 35%, transparent 70%);
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.65,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        }
      );
    };

    element.addEventListener("mouseenter", onMouseEnter);
    element.addEventListener("mousemove", onMouseMove);
    element.addEventListener("mouseleave", onMouseLeave);
    element.addEventListener("click", onClick);

    return () => {
      element.removeEventListener("mouseenter", onMouseEnter);
      element.removeEventListener("mousemove", onMouseMove);
      element.removeEventListener("mouseleave", onMouseLeave);
      element.removeEventListener("click", onClick);
      clearParticles();
    };
  }, [
    clearParticles,
    clickEffect,
    enableMagnetism,
    enableSpotlight,
    enableTilt,
    glowColor,
    shouldDisableAnimations,
    spawnParticles,
    spotlightRadius,
  ]);

  return (
    <div
      ref={cardRef}
      className={`magic-bento-card relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)] transition-all duration-300 dark:border-slate-800 dark:bg-slate-900/70 ${className}`}
      data-text-auto-hide={textAutoHide ? "true" : "false"}
      style={{
        ...(enableBorderGlow
          ? {
              boxShadow: `0 12px 40px rgba(15, 23, 42, 0.06), inset 0 0 0 1px rgba(${glowColor}, 0.08)`,
            }
          : {}),
      }}
    >
      {enableBorderGlow ? (
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-3xl border opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ borderColor: `rgba(${glowColor}, 0.25)` }}
        />
      ) : null}
      {enableSpotlight ? <div ref={spotlightRef} className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-200" /> : null}
      <div className="relative z-20">{children}</div>
    </div>
  );
};

export default MagicBento;
