'use client';

import { Moon, SunDim } from 'lucide-react';
import { useState, useRef } from 'react';
import { flushSync } from 'react-dom';
import { cn } from '@/lib/utils';

type props = {
  className?: string;
};

export const AnimatedThemeToggler = ({ className }: props) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const ICON_SIZE = 20;
  const changeTheme = async () => {
    if (!buttonRef.current) return;

    await document.startViewTransition(() => {
      flushSync(() => {
        const dark = document.documentElement.classList.toggle('dark');
        setIsDarkMode(dark);
      });
    }).ready;

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const y = top + height / 2;
    const x = left + width / 2;

    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    // Slight overshoot to avoid sub-pixel gap flash on large screens/corners
    const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom)) + 8;

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRad}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 700,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      },
    );
  };
  return (
    <button
      ref={buttonRef}
      onClick={changeTheme}
      className={cn(className, 'cursor-pointer')}
      type="button"
    >
      {isDarkMode ? <SunDim size={ICON_SIZE} /> : <Moon size={ICON_SIZE} />}
    </button>
  );
};
