'use client';

import { useEffect, useRef, useState } from 'react';

export function useClickOutSide() {
  const elementRef = useRef<HTMLElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        elementRef.current &&
        !elementRef.current.contains(e.target as Node)
      ) {
        setShow(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [elementRef]);

  return {
    elementRef,
    setShow,
    show,
  };
}
