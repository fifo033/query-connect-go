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
  const [isLoading, setIsLoading] = useState(false);

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim()) {
      toast.error('Please enter a question');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const encodedQuestion = encodeURIComponent(question.trim());
      const response = await fetch(
        `https://pavelsifisonondo.app.n8n.cloud/webhook/db156fa9-e99e-4a84-9cec-adbb11856bf5?question=${encodedQuestion}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.statusCode === 200 && data.body && data.body.answer) {
        setAnswer(data.body.answer);
      } else {
        throw new Error('Invalid response format');
      }
      
    } catch (error) {
      console.error('Error fetching answer:', error);
      toast.error('Failed to get an answer. Please try again.');
      setAnswer('Sorry, there was an error processing your question. Please try again later.');
    } finally {
      setIsLoading(false);
    }
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
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            className="w-full bg-green-500 hover:bg-green-600 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Send'}
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
