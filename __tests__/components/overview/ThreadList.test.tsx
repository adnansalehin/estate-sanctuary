import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import { userEvent } from '@testing-library/user-event';
import { ThreadList } from '@/components/overview/ThreadList';

// Mock the initialConversations
jest.mock("@/utils/constants", () => ({
  initialConversations: [
    { id: 1, date: '2023-04-01', sender: 'Buyer', recipient: 'Seller', message: 'Hello', stage: 1 },
    { id: 2, date: '2023-04-02', sender: 'Seller', recipient: 'Buyer', message: 'Hi there', stage: 1 },
  ]
}));

describe('ThreadList', () => {
  it('renders the component with initial conversations', () => {
    render(<ThreadList currentStage={1} isDarkTheme={false} />);

    expect(screen.getByText('Buyer to Seller')).toBeInTheDocument();
    expect(screen.getByText('Seller to Buyer')).toBeInTheDocument();
    expect(screen.getByText('2023-04-01')).toBeInTheDocument();
    expect(screen.getByText('2023-04-02')).toBeInTheDocument();
  });

  it('allows expanding and collapsing conversations', () => {
    render(<ThreadList currentStage={1} isDarkTheme={false} />);

    const firstConversation = screen.getByText('Buyer to Seller');
    fireEvent.click(firstConversation);

    expect(screen.getByText('Hello')).toBeInTheDocument();

    fireEvent.click(firstConversation);

    expect(screen.queryByText('Hello')).not.toBeInTheDocument();
  });

  it('renders the new thread form', () => {
    render(<ThreadList currentStage={1} isDarkTheme={false} />);

    expect(screen.getByLabelText('Recipient')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
    expect(screen.getByLabelText('Attachment')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add New Thread' })).toBeInTheDocument();
  });

  it('applies dark theme styles when isDarkTheme is true', () => {
    render(<ThreadList currentStage={1} isDarkTheme={true} />);

    const recipientInput = screen.getByLabelText('Recipient');
    expect(recipientInput).toHaveClass('bg-[#024e52]', 'text-white');
  });

//   it('submits the new thread form correctly', async () => {
//     render(<ThreadList currentStage={1} isDarkTheme={false} />);

//     const recipientInput = screen.getByLabelText('Recipient');
//     const messageInput = screen.getByLabelText('Message');
//     const submitButton = screen.getByRole('button', { name: 'Add New Thread' });

//     await userEvent.type(recipientInput, 'New Recipient');
//     await userEvent.type(messageInput, 'New message content');
//     await userEvent.click(submitButton);

//     // Assert that the new thread is added to the list
//     // expect(screen.getByText('New Recipient')).toBeInTheDocument();
//     // expect(screen.getByText('New message content')).toBeInTheDocument();
//   });

});