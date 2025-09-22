import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type GameState = "menu" | "playing" | "gameOver";

export interface Circle {
  x: number;
  y: number;
  radius: number;
}

interface LightCatchState {
  gameState: GameState;
  score: number;
  timeLeft: number;
  gameDuration: number;
  currentCircle: Circle | null;
  
  // Actions
  startGame: (duration: 30 | 60) => void;
  endGame: () => void;
  resetGame: () => void;
  incrementScore: () => void;
  setCurrentCircle: (circle: Circle | null) => void;
  decrementTime: () => void;
}

export const useLightCatch = create<LightCatchState>()(
  subscribeWithSelector((set, get) => ({
    gameState: "menu",
    score: 0,
    timeLeft: 0,
    gameDuration: 30,
    currentCircle: null,
    
    startGame: (duration) => {
      set({
        gameState: "playing",
        score: 0,
        timeLeft: duration,
        gameDuration: duration,
        currentCircle: null
      });
    },
    
    endGame: () => {
      set({
        gameState: "gameOver",
        currentCircle: null
      });
    },
    
    resetGame: () => {
      set({
        gameState: "menu",
        score: 0,
        timeLeft: 0,
        currentCircle: null
      });
    },
    
    incrementScore: () => {
      set((state) => ({
        score: state.score + 1
      }));
    },
    
    setCurrentCircle: (circle) => {
      set({ currentCircle: circle });
    },
    
    decrementTime: () => {
      set((state) => ({
        timeLeft: Math.max(0, state.timeLeft - 1)
      }));
    }
  }))
);

// Timer subscription - runs every second when playing
useLightCatch.subscribe(
  (state) => state.gameState,
  (gameState) => {
    if (gameState === "playing") {
      const timer = setInterval(() => {
        const currentState = useLightCatch.getState();
        if (currentState.gameState === "playing" && currentState.timeLeft > 0) {
          currentState.decrementTime();
        } else {
          clearInterval(timer);
        }
      }, 1000);
      
      // Clean up timer when game state changes
      return () => clearInterval(timer);
    }
  }
);
