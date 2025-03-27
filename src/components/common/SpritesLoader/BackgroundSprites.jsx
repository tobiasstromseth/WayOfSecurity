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

  // Initialiser sprites med posisjon og hastighet
  useEffect(() => {
    const initialSprites = Array.from({ length: numberOfSprites }, () => ({
      id: Math.random(),
      sprite: Sprites[Math.floor(Math.random() * Sprites.length)],
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * (100 - 50) + 50,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      velocityX: (Math.random() - 0.5) * 2,
      velocityY: (Math.random() - 0.5) * 2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
      opacity: Math.random() * (0.8 - 0.2) + 0.2,
    }));
    setSprites(initialSprites);
  }, [numberOfSprites]);

  // Håndterer kollisjon mellom to sprites
  const handleCollision = (sprite1, sprite2) => {
    // Enkel elastisk kollisjon
    const tempVx = sprite1.velocityX;
    const tempVy = sprite1.velocityY;
    
    sprite1.velocityX = sprite2.velocityX;
    sprite1.velocityY = sprite2.velocityY;
    sprite2.velocityX = tempVx;
    sprite2.velocityY = tempVy;

    // Legg til litt tilfeldighet i rotasjonen ved kollisjon
    sprite1.rotationSpeed = (Math.random() - 0.5) * 2;
    sprite2.rotationSpeed = (Math.random() - 0.5) * 2;
  };

  // Animasjonsloop
  useEffect(() => {
    const animate = () => {
      setSprites(currentSprites => {
        return currentSprites.map(sprite => {
          let { x, y, velocityX, velocityY, rotation, rotationSpeed, size } = sprite;
          
          // Oppdater posisjon
          x += velocityX;
          y += velocityY;
          rotation += rotationSpeed;

          // Sjekk kollisjon med kanter
          if (x <= 0 || x >= window.innerWidth - size) {
            velocityX *= -1;
            rotationSpeed = (Math.random() - 0.5) * 2;
          }
          if (y <= 0 || y >= window.innerHeight - size) {
            velocityY *= -1;
            rotationSpeed = (Math.random() - 0.5) * 2;
          }

          // Sjekk kollisjon med andre sprites
          currentSprites.forEach(otherSprite => {
            if (sprite.id !== otherSprite.id) {
              const dx = x - otherSprite.x;
              const dy = y - otherSprite.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              const minDistance = (size + otherSprite.size) / 2;

              if (distance < minDistance) {
                handleCollision(sprite, otherSprite);
              }
            }
          });

          return {
            ...sprite,
            x,
            y,
            velocityX,
            velocityY,
            rotation,
            rotationSpeed
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

  // Oppdater ved vindusendring
  useEffect(() => {
    const handleResize = () => {
      setSprites(currentSprites => 
        currentSprites.map(sprite => ({
          ...sprite,
          x: Math.min(sprite.x, window.innerWidth - sprite.size),
          y: Math.min(sprite.y, window.innerHeight - sprite.size)
        }))
      );
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getHueRotation = (color) => {
    switch(color) {
      case 'var(--blue)':   return '240deg';
      case 'var(--red)':    return '0deg';
      case 'var(--purple)': return '270deg';
      case 'var(--green)':  return '120deg';
      case 'var(--yellow)': return '60deg';
      default:              return '0deg';
    }
  };

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