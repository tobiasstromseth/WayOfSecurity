import React, { useEffect, useRef, useState } from 'react';
import { Sprites } from '../SpritesLoader/SpritesLoader';
import './BackgroundSprites.css';

const COLORS = [
  'var(--blue)',
  'var(--red)',
  'var(--purple)',
  'var(--green)',
  'var(--yellow)'
];

const Background = ({ numberOfSprites = 10 }) => {
  const [sprites, setSprites] = useState([]);
  const animationFrameRef = useRef();
  const containerRef = useRef();

  // Initialize sprites with position and velocity
  useEffect(() => {
    const initialSprites = Array.from({ length: numberOfSprites }, () => ({
      id: Math.random(),
      sprite: Sprites[Math.floor(Math.random() * Sprites.length)],
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * (100 - 50) + 50,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      velocityX: (Math.random() - 0.5) * 1, // Reduced velocity for less CPU usage
      velocityY: (Math.random() - 0.5) * 1, // Reduced velocity for less CPU usage
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1, // Reduced rotation speed
      opacity: Math.random() * (0.8 - 0.2) + 0.2,
    }));
    setSprites(initialSprites);
  }, [numberOfSprites]);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      setSprites(currentSprites => {
        return currentSprites.map(sprite => {
          let { x, y, velocityX, velocityY, rotation, rotationSpeed, size } = sprite;
          
          // Update position
          x += velocityX;
          y += velocityY;
          rotation += rotationSpeed;

          // Wrap around screen edges instead of collision
          if (x < -size) {
            x = window.innerWidth;
          } else if (x > window.innerWidth) {
            x = -size;
          }
          
          if (y < -size) {
            y = window.innerHeight;
          } else if (y > window.innerHeight) {
            y = -size;
          }

          return {
            ...sprite,
            x,
            y,
            rotation
          };
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Update on window resize
  useEffect(() => {
    const handleResize = () => {
      // Simple resize handler that keeps sprites visible
      setSprites(currentSprites => 
        currentSprites.map(sprite => {
          // If sprite is off-screen after resize, place it back within view
          let x = sprite.x;
          let y = sprite.y;
          
          if (x > window.innerWidth) {
            x = window.innerWidth - sprite.size;
          }
          if (y > window.innerHeight) {
            y = window.innerHeight - sprite.size;
          }
          
          return {
            ...sprite,
            x,
            y
          };
        })
      );
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={containerRef} className="background-sprites">
      {sprites.map(sprite => (
        <div
          key={sprite.id}
          className="background-sprite"
          style={{
            transform: `translate(${sprite.x}px, ${sprite.y}px) rotate(${sprite.rotation}deg)`,
            width: `${sprite.size}px`,
            height: `${sprite.size}px`,
          }}
        >
          <img
            src={sprite.sprite}
            alt=""
            className="w-full h-full"
          />
        </div>
      ))}
    </div>
  );
};

export default Background;