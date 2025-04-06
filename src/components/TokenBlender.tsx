import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { BlenderIcon } from './BlenderIcon';
import { TokenDisplay } from './TokenDisplay';
import { get_encoding } from 'tiktoken';
import { toast } from 'sonner';
import { pipeline } from '@huggingface/transformers';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Token colors for visualization
const TOKEN_COLORS = [
  "bg-purple-500", "bg-blue-500", "bg-green-500", 
  "bg-yellow-500", "bg-red-500", "bg-pink-500",
  "bg-indigo-500", "bg-teal-500", "bg-orange-500"
];

// Tokenization models
type TokenizationModel = 'chatgpt' | 'claude' | 'gemma' | 'llama';

export const TokenBlender: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [tokens, setTokens] = useState<{ text: string; id: number }[]>([]);
  const [wordCount, setWordCount] = useState<number>(0);
  const [tokenCount, setTokenCount] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isEncodingReady, setIsEncodingReady] = useState<boolean>(false);
  const [model, setModel] = useState<TokenizationModel>('chatgpt');
  const [hfTokenizer, setHfTokenizer] = useState<any>(null);

  useEffect(() => {
    // Initialize tokenizers
    const initTokenizers = async () => {
      try {
        // Initialize tiktoken for ChatGPT
        const encoding = await get_encoding("cl100k_base");
        encoding.free();
        setIsEncodingReady(true);

        // Initialize HuggingFace tokenizer for Gemma and Llama
        const tokenizer = await pipeline('token-classification', 'google/gemma-2b');
        setHfTokenizer(tokenizer);
      } catch (error) {
        console.error("Failed to initialize tokenizers:", error);
        toast.error("Failed to initialize tokenizers. Please try reloading the page.");
      }
    };
    
    initTokenizers();
  }, []);

  // Basic BPE tokenization for Claude (simplified simulation)
  const simulateClaudeBPE = (text: string): { text: string; id: number }[] => {
    if (!text) return [];
    
    // This is a simplified simulation of Claude's BPE approach
    // Note: This is not Claude's actual tokenizer, just a demonstration
    
    // Basic rules for this simplified Claude tokenizer simulation:
    // 1. Split on spaces
    // 2. Split remaining chunks into smaller fragments (2-3 characters)
    // 3. Keep punctuation separate
    
    const tokens: { text: string; id: number }[] = [];
    let tokenId = 10000; // Starting with different range than GPT tokens
    
    // Split by spaces first
    const words = text.split(/(\s+)/);
    
    for (const word of words) {
      if (!word) continue;
      
      // Handle whitespace
      if (/^\s+$/.test(word)) {
        tokens.push({ text: word, id: tokenId++ });
        continue;
      }
      
      // Handle punctuation
      const chunks = word.split(/([.,!?;:()[\]{}"'«»„"‟"'‚'‹›-])/);
      
      for (const chunk of chunks) {
        if (!chunk) continue;
        
        // For punctuation and very short chunks
        if (chunk.length <= 1) {
          tokens.push({ text: chunk, id: tokenId++ });
          continue;
        }
        
        // For normal words, simulate breaking into smaller chunks
        // Claude tends to tokenize more granularly
        let i = 0;
        while (i < chunk.length) {
          // Randomly choose 1, 2, or 3 characters to simulate subword tokenization
          const chunkSize = Math.min(
            1 + Math.floor(Math.random() * 2),
            chunk.length - i
          );
          
          const subChunk = chunk.substring(i, i + chunkSize);
          tokens.push({ text: subChunk, id: tokenId++ });
          
          i += chunkSize;
        }
      }
    }
    
    return tokens;
  };

  // Simulate Gemma tokenization using HuggingFace transformers
  const tokenizeWithGemma = async (text: string) => {
    if (!hfTokenizer) return [];
    
    try {
      const result = await hfTokenizer(text, {
        model: 'google/gemma-2b',
      });
      
      return result.map((token: any, index: number) => ({
        text: token.word,
        id: 20000 + index // Different range for Gemma tokens
      }));
    } catch (error) {
      console.error("Gemma tokenization error:", error);
      return [];
    }
  };

  // Simulate Llama tokenization
  const tokenizeWithLlama = async (text: string) => {
    if (!hfTokenizer) return [];
    
    try {
      const result = await hfTokenizer(text, {
        model: 'meta-llama/Llama-2-7b',
      });
      
      return result.map((token: any, index: number) => ({
        text: token.word,
        id: 30000 + index // Different range for Llama tokens
      }));
    } catch (error) {
      console.error("Llama tokenization error:", error);
      return [];
    }
  };
  
  // Tokenize the text using selected model
  const tokenizeText = async (text: string) => {
    if (!text.trim()) {
      toast.error("Please enter some text to tokenize");
      return;
    }
    
    if (model === 'chatgpt' && !isEncodingReady) {
      toast.error("Tokenizer is not ready yet. Please wait a moment and try again.");
      return;
    }
    
    setIsProcessing(true);
    setShowResults(false);
    
    try {
      let tokensList: { text: string; id: number }[] = [];
      
      // Choose tokenization method based on selected model
      switch (model) {
        case 'chatgpt':
          console.log("Creating OpenAI encoding...");
          const encoding = await get_encoding("cl100k_base");
          console.log("Encoding created");
          
          // Get token IDs for ChatGPT
          const tokenIds = encoding.encode(text);
          console.log("Text encoded, token IDs:", tokenIds);
          
          // Process each token ID individually
          for (let i = 0; i < tokenIds.length; i++) {
            const id = tokenIds[i];
            
            // Convert the single token ID to a Uint32Array
            const tokenIdArray = new Uint32Array([id]);
            
            try {
              // Decode this single token ID to get its bytes representation
              const bytes = encoding.decode(tokenIdArray);
              
              // Convert the bytes to a string 
              const tokenText = String.fromCharCode(...bytes);
              
              tokensList.push({
                text: tokenText || `<Token ${id}>`,
                id: id
              });
            } catch (e) {
              console.error(`Error decoding token ID ${id}:`, e);
              // Fallback for tokens that can't be decoded properly
              tokensList.push({
                text: `<Token ${id}>`,
                id: id
              });
            }
          }
          
          encoding.free();
          console.log("ChatGPT tokenization complete");
          break;
        case 'claude':
          tokensList = simulateClaudeBPE(text);
          console.log("Claude tokenization complete", tokensList);
          break;
        case 'gemma':
          tokensList = await tokenizeWithGemma(text);
          console.log("Gemma tokenization complete", tokensList);
          break;
        case 'llama':
          tokensList = await tokenizeWithLlama(text);
          console.log("Llama tokenization complete", tokensList);
          break;
      }
      
      // Count words (simple space-based splitting)
      const words = text.trim().split(/\s+/).filter(word => word.length > 0);
      
      setTokens(tokensList);
      setWordCount(words.length);
      setTokenCount(tokensList.length);
      
      // Simulate processing time for the animation
      setTimeout(() => {
        setIsProcessing(false);
        setShowResults(true);
      }, 2000);
      
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
          Compare how different language models tokenize your text
        </p>
      </div>
      
      <Card className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <label htmlFor="text-input" className="text-sm font-medium">
              Enter a sentence:
            </label>
            <div className="w-48">
              <Select 
                value={model}
                onValueChange={(value: TokenizationModel) => setModel(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chatgpt">ChatGPT</SelectItem>
                  <SelectItem value="claude">Claude</SelectItem>
                  <SelectItem value="gemma">Gemma</SelectItem>
                  <SelectItem value="llama">Llama</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
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
          Tokenizing with {model === 'chatgpt' ? 'ChatGPT' : 'Claude'} model...
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
            <div className="border-r border-gray-300"></div>
            <div>
              <span className="text-sm text-gray-500">Model:</span>
              <p className="font-bold text-lg">{model === 'chatgpt' ? 'ChatGPT' : 'Claude'}</p>
            </div>
          </div>
        </div>
        
        <Card className="p-6">
          <h3 className="font-medium mb-3">Tokens:</h3>
          <div className="flex flex-wrap gap-2">
            {tokens.map((token, idx) => (
              <TokenDisplay 
                key={idx} 
                token={token.text} 
                tokenId={token.id}
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
          <p className="text-sm text-gray-600 mt-2">
            <strong>{model === 'chatgpt' ? 'ChatGPT' : 'Claude'} tokenization:</strong> {' '}
            {model === 'chatgpt' 
              ? 'Uses Byte-level BPE tokenization. This allows it to handle any Unicode text by breaking it into subwords.'
              : 'Typically uses a more granular BPE tokenization, often breaking words into smaller pieces than ChatGPT.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TokenBlender;
