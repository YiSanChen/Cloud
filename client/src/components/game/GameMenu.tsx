import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLightCatch } from "@/lib/stores/useLightCatch";
import { Zap, Clock, Target } from "lucide-react";

export default function GameMenu() {
  const { startGame } = useLightCatch();

  const handleStartGame = (duration: 30 | 60) => {
    startGame(duration);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-sm shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Zap className="h-12 w-12 text-yellow-500 mr-2" />
            <CardTitle className="text-3xl font-bold text-gray-800">
              Light Catch
            </CardTitle>
          </div>
          <p className="text-gray-600 text-lg">
            Click on the glowing circles as fast as you can!
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center justify-center">
              <Clock className="h-5 w-5 mr-2" />
              Choose Game Duration
            </h3>
          </div>
          
          <div className="space-y-3">
            <Button
              onClick={() => handleStartGame(30)}
              className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <Target className="h-6 w-6 mr-2" />
              30 Seconds - Quick Game
            </Button>
            
            <Button
              onClick={() => handleStartGame(60)}
              className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <Target className="h-6 w-6 mr-2" />
              60 Seconds - Extended Game
            </Button>
          </div>
          
          <div className="text-center text-sm text-gray-500 space-y-1">
            <p>🎯 Click on circles to score points</p>
            <p>⚡ React quickly for higher scores</p>
            <p>🔥 Miss clicks don't count against you</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
