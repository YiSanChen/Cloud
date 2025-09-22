import { useEffect, useRef } from "react";
import { useLightCatch } from "@/lib/stores/useLightCatch";
import { useAudio } from "@/lib/stores/useAudio";
import { generateRandomCircle, isPointInCircle } from "@/lib/game-utils";

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const { 
    currentCircle, 
    setCurrentCircle, 
    incrementScore, 
    timeLeft,
    endGame 
  } = useLightCatch();
  const { playHit } = useAudio();

  // Handle canvas click
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!currentCircle) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const clickX = (event.clientX - rect.left) * scaleX;
    const clickY = (event.clientY - rect.top) * scaleY;

    // Check if click is within the circle
    if (isPointInCircle(clickX, clickY, currentCircle)) {
      // Hit! Play sound, increment score, generate new circle
      playHit();
      incrementScore();
      
      const canvas = canvasRef.current;
      if (canvas) {
        const newCircle = generateRandomCircle(canvas.width, canvas.height);
        setCurrentCircle(newCircle);
      }
    }
    // If miss, do nothing (circle stays)
  };

  // Game loop for rendering
  const gameLoop = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw current circle if it exists
    if (currentCircle) {
      // Create glowing effect
      const gradient = ctx.createRadialGradient(
        currentCircle.x, currentCircle.y, 0,
        currentCircle.x, currentCircle.y, currentCircle.radius
      );
      gradient.addColorStop(0, '#ffff00');
      gradient.addColorStop(0.7, '#ff6b00');
      gradient.addColorStop(1, '#ff0000');
      
      // Draw glow
      ctx.save();
      ctx.shadowColor = '#ffff00';
      ctx.shadowBlur = 20;
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(currentCircle.x, currentCircle.y, currentCircle.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      
      // Draw inner bright circle
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(currentCircle.x, currentCircle.y, currentCircle.radius * 0.3, 0, Math.PI * 2);
      ctx.fill();
    }

    if (timeLeft > 0) {
      animationRef.current = requestAnimationFrame(gameLoop);
    }
  };

  // Initialize canvas and start game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Generate first circle
    if (!currentCircle) {
      const newCircle = generateRandomCircle(canvas.width, canvas.height);
      setCurrentCircle(newCircle);
    }

    // Start game loop
    gameLoop();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [currentCircle, setCurrentCircle]);

  // End game when time runs out
  useEffect(() => {
    if (timeLeft <= 0) {
      endGame();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  }, [timeLeft, endGame]);

  return (
    <div className="w-full h-full">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="w-full h-full cursor-pointer"
        style={{ 
          background: 'radial-gradient(circle at center, #1a1a2e 0%, #16213e 100%)',
          touchAction: 'none'
        }}
      />
    </div>
  );
}
