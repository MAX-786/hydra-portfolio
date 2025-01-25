'use client';

import {
  motion,
  useMotionValue,
  AnimatePresence,
} from 'framer-motion';
import SpongeSvg from './SpongeSvg';
import { useEffect, useState } from 'react';

const Bubbles = ({ spongeX, spongeY }: { spongeX: number; spongeY: number }) => {
  const [bubbles, setBubbles] = useState<
    { x: number; y: number; delay: number }[]
  >([]);

  useEffect(() => {
    const generateBubbles = () =>
      [...Array(40)].map(() => ({
        x: Math.random() * 500 - 250,
        y: Math.random() * 500 - 250,
        delay: Math.random() * 2,
      }));

    setBubbles(generateBubbles());
  }, []);

  return (
    <>
      {bubbles.map((bubble, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/40 rounded-full"
          initial={{
            scale: 1,
            x: spongeX + bubble.x,
            y: spongeY + bubble.y,
          }}
          animate={{
            scale: [0, 2, 3],
            x: spongeX + bubble.x * 2,
            y: spongeY + bubble.y * -3,
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 3 + bubble.delay,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </>
  );
};

const LoadingScreen = ({ isLoading }: { isLoading: boolean }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!isLoading) return;

    const animationLoop = () => {
      const time = performance.now()*0.5;
      const zigzag = Math.sin(time / 200) * 300; // Zigzag motion
      const vertical = Math.sin(time / 150) * 200; // Faster vertical motion
      y.set(vertical);
      x.set(zigzag);
      rotate.set(Math.sin(time / 100) * 10); // Sponge rotation
      setScale(0.8 + Math.abs(Math.sin(time / 300)) * 0.3);
      requestAnimationFrame(animationLoop);
    };

    const animationId = requestAnimationFrame(animationLoop);
    return () => cancelAnimationFrame(animationId);
  }, [isLoading, x, y, rotate]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Water Trail */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-blue-300/10 to-transparent"
            style={{
              background: `
                radial-gradient(circle at ${x.get()}px ${y.get()}px, 
                rgba(255, 255, 255, 0.3) 0%, 
                rgba(255, 255, 255, 0) 80%)`,
            }}
          />

          {/* Sponge */}
          <motion.div
            style={{ x, y, rotate, scale }}
            className="relative z-10 w-24 h-24"
          >
            <SpongeSvg className="w-full h-full drop-shadow-lg" />
            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-blue-500/30 rounded-full blur-lg"
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </motion.div>

          {/* Floating Bubbles */}
          <Bubbles spongeX={x.get()} spongeY={y.get()} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
