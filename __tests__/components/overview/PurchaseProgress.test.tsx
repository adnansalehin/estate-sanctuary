import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PurchaseProgress } from '@/components/overview/PurchaseProgress';
import { stages } from "@/utils/constants";

describe('PurchaseProgress', () => {
  const mockOnStageClick = jest.fn();

  it('renders the component with correct title and stages', () => {
    render(<PurchaseProgress currentStage={1} onStageClick={mockOnStageClick} isDarkTheme={false} />);

    expect(screen.getByText('Purchase Progress')).toBeInTheDocument();
    
    stages.forEach((stage) => {
      expect(screen.getByText(stage.name)).toBeInTheDocument();
    });
  });

  it('applies correct styles based on current stage', () => {
    const currentStage = 1;
    render(<PurchaseProgress currentStage={currentStage} onStageClick={mockOnStageClick} isDarkTheme={false} />);

    stages.forEach((stage, index) => {
      const button = screen.getByText(stage.name);
      if (index <= currentStage) {
        expect(button).toHaveClass('text-[#024e52]');
      } else {
        expect(button).toHaveClass('text-gray-600');
      }
    });
  });

  it('calls onStageClick when a stage is clicked', () => {
    render(<PurchaseProgress currentStage={1} onStageClick={mockOnStageClick} isDarkTheme={false} />);

    const secondStageButton = screen.getByText(stages[1].name);
    fireEvent.click(secondStageButton);

    expect(mockOnStageClick).toHaveBeenCalledWith(1);
  });

//   it('calculates and displays correct progress', () => {
//     const currentStage = 1;
//     render(<PurchaseProgress currentStage={currentStage} onStageClick={mockOnStageClick} isDarkTheme={false} />);

//     const progressBar = screen.getByRole('progressbar');
//     const expectedProgress = ((currentStage + 1) / stages.length * 100).toString();
//     // expect(progressBar).toHaveAttribute('aria-valuenow', expectedProgress);
//     expect(progressBar).toHaveStyle(`width: ${expectedProgress}%`);
//   });

});