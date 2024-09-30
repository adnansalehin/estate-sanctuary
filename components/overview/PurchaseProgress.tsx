import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { stages } from "@/utils/constants"

type PurchaseProgressProps = {
  currentStage: number;
  onStageClick: (index: number) => void;
  isDarkTheme: boolean;
}

export function PurchaseProgress({ currentStage, onStageClick, isDarkTheme }: PurchaseProgressProps) {
  return (
    <Card className={isDarkTheme ? "bg-[#013639] text-white" : "bg-white text-[#024e52]"}>
      <CardHeader>
        <CardTitle>Purchase Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress 
          value={(currentStage + 1) / stages.length * 100} 
          className="h-2 mb-2 isDarkTheme ? bg-[#024e52]" 
        />
        <div className="flex justify-between text-sm">
          {stages.map((stage, index) => (
            <button
              key={stage.name}
              onClick={() => onStageClick(index)}
              className={`flex flex-col items-center ${
                index <= currentStage 
                  ? (isDarkTheme ? 'text-white' : 'text-[#024e52]') 
                  : isDarkTheme ? 'text-gray-400' : 'text-gray-600'
              } focus:outline-none`}
            >
              <div className={`w-3 h-3 rounded-full mb-1 ${
                index <= currentStage 
                  ? (isDarkTheme ? 'bg-white' : 'bg-[#024e52]') 
                  : isDarkTheme ? 'bg-gray-600' : 'bg-gray-300'
              }`} />
              {stage.name}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}