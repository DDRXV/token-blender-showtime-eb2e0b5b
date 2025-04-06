
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { tokenizeWithChatGPT } from '../utils/tokenizers/chatGptTokenizer';
import { tokenizeWithLlama, initializeLlamaTokenizer } from '../utils/tokenizers/llamaTokenizer';
import { Token, TokenizationModel } from '../utils/types';
import { get_encoding } from 'tiktoken';

export const useTokenizer = () => {
  const [isEncodingReady, setIsEncodingReady] = useState<boolean>(false);
  const [isLlamaReady, setIsLlamaReady] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [wordCount, setWordCount] = useState<number>(0);
  const [tokenCount, setTokenCount] = useState<number>(0);
  const [initializationError, setInitializationError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize tokenizers
    const initTokenizers = async () => {
      console.log("Starting tokenizer initialization...");
      
      try {
        // Initialize tiktoken for ChatGPT
        console.log("Initializing tiktoken encoding...");
        try {
          const encoding = await get_encoding("cl100k_base");
          encoding.free();
          setIsEncodingReady(true);
          console.log("ChatGPT tokenizer initialized successfully");
        } catch (error) {
          console.error("ChatGPT tokenizer initialization error:", error);
          toast.error("Failed to initialize ChatGPT tokenizer");
          setInitializationError("ChatGPT tokenizer failed to initialize");
        }

        // Initialize Llama tokenizer
        console.log("Initializing Llama tokenizer...");
        try {
          const llamaInitialized = await initializeLlamaTokenizer();
          setIsLlamaReady(llamaInitialized);
          console.log("Llama tokenizer initialized:", llamaInitialized ? "success" : "failed");
        } catch (error) {
          console.error("Llama tokenizer initialization error:", error);
          toast.error("Failed to initialize Llama tokenizer");
          setInitializationError("Llama tokenizer failed to initialize");
        }
      } catch (error) {
        console.error("Global tokenizer initialization error:", error);
        toast.error("Failed to initialize tokenizers. Please try reloading the page.");
        setInitializationError("Failed to initialize tokenizers");
      }
    };
    
    initTokenizers();
  }, []);

  const tokenizeText = async (text: string, model: TokenizationModel) => {
    console.log(`Attempting to tokenize text with ${model} model`);
    
    if (!text.trim()) {
      toast.error("Please enter some text to tokenize");
      return;
    }
    
    if (model === 'chatgpt' && !isEncodingReady) {
      toast.error("ChatGPT tokenizer is not ready yet. Please wait a moment and try again.");
      return;
    }
    
    if (model === 'llama' && !isLlamaReady) {
      toast.error("Llama tokenizer is not ready yet. Please wait a moment and try again.");
      return;
    }
    
    setIsProcessing(true);
    setShowResults(false);
    
    try {
      let tokensList: Token[] = [];
      
      // Choose tokenization method based on selected model
      switch (model) {
        case 'chatgpt':
          console.log("Starting ChatGPT tokenization");
          tokensList = await tokenizeWithChatGPT(text);
          break;
        case 'llama':
          console.log("Starting Llama tokenization");
          tokensList = await tokenizeWithLlama(text);
          break;
      }
      
      // Count words (simple space-based splitting)
      const words = text.trim().split(/\s+/).filter(word => word.length > 0);
      
      setTokens(tokensList);
      setWordCount(words.length);
      setTokenCount(tokensList.length);
      console.log(`Tokenization complete. ${tokensList.length} tokens found.`);
      
      // Simulate processing time for the animation
      setTimeout(() => {
        setIsProcessing(false);
        setShowResults(true);
      }, 2000);
      
    } catch (error) {
      console.error("Tokenization error:", error);
      toast.error(`Error tokenizing text with ${model}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsProcessing(false);
    }
  };

  return {
    isEncodingReady,
    isLlamaReady,
    isProcessing,
    showResults,
    tokens,
    wordCount,
    tokenCount,
    tokenizeText,
    setIsProcessing,
    setShowResults,
    initializationError
  };
};
