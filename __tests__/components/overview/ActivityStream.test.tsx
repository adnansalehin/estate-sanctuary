import React from 'react';
import { render, screen } from '@testing-library/react';
import { ActivityStream } from '@/components/overview/ActivityStream';
import { activities } from "@/utils/constants";

// Mock the DocumentUpload and ThreadList components
jest.mock("@/components/overview/DocumentUpload", () => ({
  DocumentUpload: () => <div data-testid="document-upload">Document Upload</div>
}));

jest.mock("@/components/overview/ThreadList", () => ({
  ThreadList: () => <div data-testid="thread-list">Thread List</div>
}));

describe('ActivityStream', () => {
  it('renders the component with activities', () => {
    render(<ActivityStream currentStage={1} isDarkTheme={false} />);

    expect(screen.getByText('Activity Stream')).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Documents')).toBeInTheDocument();
    expect(screen.getByText('Enquiries')).toBeInTheDocument();
    expect(screen.getByText('Thread')).toBeInTheDocument();

    // Check if at least one activity is rendered
    const firstActivity = activities.find(activity => activity.stage <= 2);
    if (firstActivity) {
      expect(screen.getByText(firstActivity.event)).toBeInTheDocument();
    }
  });

});