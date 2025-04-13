
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

const Index = () => {
  const [question, setQuestion] = useState('');
  const [destinationUrl, setDestinationUrl] = useState('');

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim()) {
      toast.error('Please enter a question');
      return;
    }

    if (!destinationUrl.trim()) {
      toast.error('Please enter a destination URL');
      return;
    }

    // Encode the question to pass as a parameter
    const encodedQuestion = encodeURIComponent(question);
    const urlWithParam = `${destinationUrl}?question=${encodedQuestion}`;

    // Open the destination URL in a new tab
    window.open(urlWithParam, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-soft-purple p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-dark-purple">
          Ask a Question
        </h1>
        <form onSubmit={handleQuestionSubmit} className="space-y-4">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here..."
            className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-purple"
          />
          <input
            type="url"
            value={destinationUrl}
            onChange={(e) => setDestinationUrl(e.target.value)}
            placeholder="Enter destination URL (https://example.com)"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-purple"
          />
          <Button 
            type="submit" 
            className="w-full bg-primary-purple hover:bg-secondary-purple text-white"
          >
            Send Question
          </Button>
        </form>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default Index;
