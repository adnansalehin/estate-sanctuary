import React from 'react';
import { render, screen } from '@testing-library/react';
import { Profile } from '@/components/overview/Profile';

describe('Profile', () => {
  it('renders the component with correct information', () => {
    render(<Profile currentStage={1} isDarkTheme={false} />);

    // Check for static content
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Buyer')).toBeInTheDocument();
    expect(screen.getByText('Your Documents')).toBeInTheDocument();
  });

//   it('applies dark theme styles when isDarkTheme is true', () => {
//     render(<Profile currentStage={1} isDarkTheme={true} />);

//     const card = screen.getByText('Profile').closest('.bg-[#013639]');
//     expect(card).toHaveClass('bg-[#013639]', 'text-white');
//   });
});