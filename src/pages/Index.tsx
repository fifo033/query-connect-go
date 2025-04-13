
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { ThemeToggle } from '@/components/ThemeToggle';

const Index = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('Your answer will appear here...');

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim()) {
      toast.error('Please enter a question');
      return;
    }
    
    // In a real implementation, you would send the question to a server or API
    // For this demo, we'll just echo the question with a simple response
    setAnswer(`You asked: "${question}"
    
This is a sample answer. In a real implementation, this would come from an API or backend system.`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-foreground">
          Ask a Question
        </h1>
        <form onSubmit={handleQuestionSubmit} className="space-y-4">
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here..."
            className="w-full"
          />
          <Button 
            type="submit" 
            className="w-full bg-green-500 hover:bg-green-600 text-white"
          >
            Send
          </Button>
        </form>
        
        <div className="mt-6 p-4 border border-gray-200 rounded-md min-h-[100px] whitespace-pre-line bg-background text-foreground">
          {answer}
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default Index;
