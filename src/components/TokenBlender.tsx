import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { BlenderIcon } from './BlenderIcon';
import { TokenDisplay } from './TokenDisplay';
import { get_encoding } from 'tiktoken';
import { toast } from 'sonner';

// Token colors for visualization
const TOKEN_COLORS = [
  "bg-purple-500", "bg-blue-500", "bg-green-500", 
  "bg-yellow-500", "bg-red-500", "bg-pink-500",
  "bg-indigo-500", "bg-teal-500", "bg-orange-500"
];

export const TokenBlender: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [tokens, setTokens] = useState<string[]>([]);
  const [wordCount, setWordCount] = useState<number>(0);
  const [tokenCount, setTokenCount] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  
  // Tokenize the text using tiktoken
  const tokenizeText = async (text: string) => {
    if (!text.trim()) {
      toast.error("Please enter some text to tokenize");
      return;
    }
    
    setIsProcessing(true);
    setShowResults(false);
    
    try {
      // Using cl100k_base encoding (the one used by GPT-4 and GPT-3.5-turbo)
      const encoding = await get_encoding("cl100k_base");
      
      // Get token IDs
      const tokenIds = encoding.encode(text);
      
      // Decode each token ID back to its string representation
      const tokenStrings = Array.from(tokenIds).map(id => 
        encoding.decode_single_token_bytes(id).toString()
      );
      
      // Count words (simple space-based splitting for now)
      const words = text.trim().split(/\s+/).filter(word => word.length > 0);
      
      setTokens(tokenStrings);
      setWordCount(words.length);
      setTokenCount(tokenIds.length);
      
      // Simulate processing time for the animation
      setTimeout(() => {
        setIsProcessing(false);
        setShowResults(true);
      }, 2000);
      
      encoding.free();
    } catch (error) {
      console.error("Tokenization error:", error);
      toast.error("Error tokenizing text. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blender-primary mb-3">Token Blender</h1>
        <p className="text-gray-600 mb-6">
          See how large language models tokenize your text into smaller pieces
        </p>
      </div>
      
      <Card className="p-6">
        <div className="flex flex-col gap-4">
          <label htmlFor="text-input" className="text-sm font-medium">
            Enter a sentence:
          </label>
          <div className="flex gap-2">
            <Input
              id="text-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your sentence here..."
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter') tokenizeText(inputText);
              }}
            />
            <Button 
              onClick={() => tokenizeText(inputText)}
              disabled={isProcessing}
            >
              Tokenize
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Blender Animation */}
      <div className={`transition-all duration-500 ${isProcessing ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <BlenderIcon isActive={isProcessing} />
        <p className="text-center text-sm text-gray-500 animate-pulse mt-2">
          Tokenizing...
        </p>
      </div>
      
      {/* Results Section */}
      <div 
        className={`transition-all duration-500 space-y-4 ${showResults ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}
      >
        <div className="text-center mb-4">
          <div className="inline-flex gap-6 p-3 bg-gray-50 rounded-lg">
            <div>
              <span className="text-sm text-gray-500">Words:</span>
              <p className="font-bold text-lg">{wordCount}</p>
            </div>
            <div className="border-r border-gray-300"></div>
            <div>
              <span className="text-sm text-gray-500">Tokens:</span>
              <p className="font-bold text-lg">{tokenCount}</p>
            </div>
          </div>
        </div>
        
        <Card className="p-6">
          <h3 className="font-medium mb-3">Tokens:</h3>
          <div className="flex flex-wrap gap-2">
            {tokens.map((token, idx) => (
              <TokenDisplay 
                key={idx} 
                token={token} 
                color={TOKEN_COLORS[idx % TOKEN_COLORS.length]} 
                index={idx} 
              />
            ))}
          </div>
        </Card>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2 text-sm">What are tokens?</h3>
          <p className="text-sm text-gray-600">
            Tokens are the basic units that language models process. They can be words,
            parts of words, or even punctuation. Models like GPT-4 have a maximum token limit for both
            input and output. Understanding tokenization helps you optimize your prompts and 
            estimate costs for API usage.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TokenBlender;
