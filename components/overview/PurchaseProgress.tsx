'use client'

import { useState, useEffect } from 'react'
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StageType } from '@/app/types'

type PurchaseProgressProps = {
  stages: StageType[];
  currentStage: number | null;
  onStageClick: (index: number) => void;
  isDarkTheme: boolean;
}

export function PurchaseProgress({ stages, currentStage=1, onStageClick, isDarkTheme }: PurchaseProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Calculate progress based on currentStage
    setProgress(((currentStage + 1) / stages.length) * 100);
  }, [currentStage, stages.length]);

  return (
    <Card className={isDarkTheme ? "bg-[#013639] text-white" : "bg-white text-[#024e52]"}>
      <CardHeader>
        <CardTitle>Purchase Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress 
          value={progress} 
          className={`h-2 mb-4 ${isDarkTheme ? 'bg-[#024e52]' : 'bg-gray-200'}`}
          indicatorClassName={isDarkTheme ? 'bg-white' : 'bg-[#024e52]'}
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