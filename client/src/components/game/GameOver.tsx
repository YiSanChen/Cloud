import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLightCatch } from "@/lib/stores/useLightCatch";
import { Trophy, RotateCcw, Target, Clock } from "lucide-react";

export default function GameOver() {
  const { score, gameDuration, resetGame } = useLightCatch();

  const getScoreMessage = () => {
    const scorePerSecond = score / gameDuration;
    
    if (scorePerSecond >= 2) {
      return "🔥 Lightning Fast! You're a reaction master!";
    } else if (scorePerSecond >= 1.5) {
      return "⚡ Excellent reflexes! Well done!";
    } else if (scorePerSecond >= 1) {
      return "👍 Good job! Your reactions are solid!";
    } else if (scorePerSecond >= 0.5) {
      return "💪 Not bad! Keep practicing!";
    } else {
      return "🎯 Room for improvement! Try again!";
    }
  };

  const handlePlayAgain = () => {
    resetGame();
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="h-12 w-12 text-yellow-500 mr-2" />
            <CardTitle className="text-3xl font-bold text-gray-800">
              Game Over!
            </CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Final Score */}
          <div className="text-center space-y-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-4">
              <p className="text-sm font-medium opacity-90">Final Score</p>
              <p className="text-4xl font-bold">{score}</p>
            </div>
          </div>

          {/* Game Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Target className="h-6 w-6 mx-auto text-blue-600 mb-1" />
              <p className="text-xs text-gray-600">Circles Hit</p>
              <p className="text-lg font-bold text-gray-800">{score}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Clock className="h-6 w-6 mx-auto text-green-600 mb-1" />
              <p className="text-xs text-gray-600">Game Time</p>
              <p className="text-lg font-bold text-gray-800">{gameDuration}s</p>
            </div>
          </div>

          {/* Performance Message */}
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700">
              {getScoreMessage()}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Average: {(score / gameDuration).toFixed(1)} circles per second
            </p>
          </div>

          {/* Play Again Button */}
          <Button
            onClick={handlePlayAgain}
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <RotateCcw className="h-6 w-6 mr-2" />
            Play Again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
