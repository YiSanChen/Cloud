import { useEffect } from "react";
import { useAudio } from "./lib/stores/useAudio";
import { useLightCatch } from "./lib/stores/useLightCatch";
import GameMenu from "./components/game/GameMenu";
import GameCanvas from "./components/game/GameCanvas";
import GameUI from "./components/game/GameUI";
import GameOver from "./components/game/GameOver";
import "@fontsource/inter";

function App() {
  const { gameState } = useLightCatch();
  const { setHitSound, setSuccessSound } = useAudio();

  // Initialize audio on component mount
  useEffect(() => {
    const initializeAudio = async () => {
      try {
        // Load hit sound
        const hitAudio = new Audio("/sounds/hit.mp3");
        hitAudio.preload = "auto";
        setHitSound(hitAudio);

        // Load success sound
        const successAudio = new Audio("/sounds/success.mp3");
        successAudio.preload = "auto";
        setSuccessSound(successAudio);
      } catch (error) {
        console.log("Audio initialization failed:", error);
      }
    };

    initializeAudio();
  }, [setHitSound, setSuccessSound]);

  return (
    <div 
      style={{ 
        width: '100vw', 
        height: '100vh', 
        position: 'relative', 
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}
    >
      {gameState === 'menu' && <GameMenu />}
      
      {gameState === 'playing' && (
        <>
          <GameCanvas />
          <GameUI />
        </>
      )}
      
      {gameState === 'gameOver' && <GameOver />}
    </div>
  );
}

export default App;
