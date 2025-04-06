
import { Token } from '../types';
import { pipeline } from '@huggingface/transformers';

// Shared HuggingFace tokenizer instance
let hfTokenizer: any = null;

// Initialize the HuggingFace tokenizer
export const initializeHuggingFaceTokenizer = async () => {
  try {
    if (!hfTokenizer) {
      hfTokenizer = await pipeline('token-classification', 'google/gemma-2b');
    }
    return hfTokenizer;
  } catch (error) {
    console.error("Failed to initialize HuggingFace tokenizer:", error);
    throw error;
  }
};

// Simulate Gemma tokenization using HuggingFace transformers
export const tokenizeWithGemma = async (text: string): Promise<Token[]> => {
  try {
    const tokenizer = await initializeHuggingFaceTokenizer();
    
    const result = await tokenizer(text, {
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
export const tokenizeWithLlama = async (text: string): Promise<Token[]> => {
  try {
    const tokenizer = await initializeHuggingFaceTokenizer();
    
    const result = await tokenizer(text, {
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
