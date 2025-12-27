import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { PunishmentPrediction } from "@/utils/punishment-predictor";
import { Sparkles, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PunishmentRecommendationProps {
  prediction: PunishmentPrediction;
  onAccept: (prediction: PunishmentPrediction) => void;
  onDismiss: () => void;
}

export function PunishmentRecommendation({
  prediction,
  onAccept,
  onDismiss,
}: PunishmentRecommendationProps) {
  return (
    <Alert className="bg-gradient-to-r from-violet-50 to-indigo-50 border-violet-200">
      <Sparkles className="h-5 w-5 text-violet-600" />
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center justify-between">
          <AlertTitle className="text-violet-900 font-semibold flex items-center gap-2">
            AI Suggestion: {prediction.type.replace("_", " ").toUpperCase()}
            <Badge
              variant="outline"
              className="bg-white text-violet-600 border-violet-200 text-[10px]"
            >
              {Math.round(prediction.confidence * 100)}% Match
            </Badge>
          </AlertTitle>
        </div>

        <AlertDescription className="text-violet-700">
          <p className="mb-2 font-medium">{prediction.title}</p>
          <p className="text-sm opacity-90 mb-2">{prediction.reasoning}</p>

          <div className="flex gap-2 mt-2">
            <Button
              size="sm"
              onClick={() => onAccept(prediction)}
              className="bg-violet-600 hover:bg-violet-700 text-white border-0 h-8 text-xs"
            >
              <Check className="mr-1 h-3 w-3" /> Apply Suggestion
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onDismiss}
              className="text-violet-600 border-violet-300 hover:bg-violet-100 h-8 text-xs"
            >
              <X className="mr-1 h-3 w-3" /> Dismiss
            </Button>
          </div>
        </AlertDescription>
      </div>
    </Alert>
  );
}
