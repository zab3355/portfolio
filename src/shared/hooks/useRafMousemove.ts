import { useEffect, useRef } from 'react';

type MousemoveHandler = (event: MouseEvent) => void;

export default function useRafMousemove(handler: MousemoveHandler, enabled = true) {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let frameId = 0;
    let lastEvent: MouseEvent | null = null;

    const flush = () => {
      frameId = 0;
      if (!lastEvent) {
        return;
      }

      const event = lastEvent;
      lastEvent = null;
      handlerRef.current(event);
    };

    const onMouseMove = (event: MouseEvent) => {
      lastEvent = event;
      if (frameId === 0) {
        frameId = window.requestAnimationFrame(flush);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [enabled]);
}