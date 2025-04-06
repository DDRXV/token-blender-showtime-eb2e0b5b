
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { tokenizeWithChatGPT } from '../utils/tokenizers/chatGptTokenizer';
import { simulateClaudeBPE } from '../utils/tokenizers/claudeTokenizer';
import { tokenizeWithGemma, tokenizeWithLlama, initializeHuggingFaceTokenizer } from '../utils/tokenizers/huggingFaceTokenizers';
import { Token, TokenizationModel } from '../utils/types';
import { get_encoding } from 'tiktoken';

export const useTokenizer = () => {
  const [isEncodingReady, setIsEncodingReady] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [wordCount, setWordCount] = useState<number>(0);
  const [tokenCount, setTokenCount] = useState<number>(0);

  useEffect(() => {
    // Initialize tokenizers
    const initTokenizers = async () => {
      try {
        // Initialize tiktoken for ChatGPT
        const encoding = await get_encoding("cl100k_base");
        encoding.free();
        setIsEncodingReady(true);

        // Initialize HuggingFace tokenizer for Gemma and Llama
        await initializeHuggingFaceTokenizer();
      } catch (error) {
        console.error("Failed to initialize tokenizers:", error);
        toast.error("Failed to initialize tokenizers. Please try reloading the page.");
      }
    };
    
    initTokenizers();
  }, []);

  const tokenizeText = async (text: string, model: TokenizationModel) => {
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
      let tokensList: Token[] = [];
      
      // Choose tokenization method based on selected model
      switch (model) {
        case 'chatgpt':
          tokensList = await tokenizeWithChatGPT(text);
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

  return {
    isEncodingReady,
    isProcessing,
    showResults,
    tokens,
    wordCount,
    tokenCount,
    tokenizeText,
    setIsProcessing,
    setShowResults
  };
};
