import { useLightCatch } from "@/lib/stores/useLightCatch";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Clock, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAudio } from "@/lib/stores/useAudio";

export default function GameUI() {
  const { score, timeLeft } = useLightCatch();
  const { isMuted, toggleMute } = useAudio();

  const formatTime = (seconds: number) => {
    return seconds.toString().padStart(2, '0');
  };

  return (
    <div className="absolute top-4 left-4 right-4 z-10 pointer-events-none">
      <div className="flex justify-between items-start">
        {/* Score Card */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg pointer-events-auto">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-6 w-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600 font-medium">Score</p>
                <p className="text-2xl font-bold text-gray-800">{score}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Controls */}
        <div className="flex space-x-2">
          {/* Audio Toggle */}
          <Button
            onClick={toggleMute}
            size="sm"
            variant="outline"
            className="bg-white/90 backdrop-blur-sm shadow-lg pointer-events-auto"
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Timer Card */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg pointer-events-auto">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-6 w-6 text-red-600" />
              <div>
                <p className="text-sm text-gray-600 font-medium">Time Left</p>
                <p className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-600' : 'text-gray-800'}`}>
                  {formatTime(timeLeft)}s
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <div className="flex justify-center mt-4">
        <Card className="bg-black/50 backdrop-blur-sm border-0">
          <CardContent className="p-3">
            <p className="text-white text-sm font-medium text-center">
              Click on the glowing circles as fast as you can!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
