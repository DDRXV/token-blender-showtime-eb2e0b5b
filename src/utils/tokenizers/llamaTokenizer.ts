import { Token } from '../types';
import { pipeline } from '@huggingface/transformers';
import { AutoTokenizer } from '@huggingface/transformers';

// Keep track of tokenizer instance
let llamaTokenizer: any = null;

// Initialize the Llama tokenizer
export const initializeLlamaTokenizer = async () => {
  if (!llamaTokenizer) {
    try {
      // Use AutoTokenizer for more reliable loading
      llamaTokenizer = await AutoTokenizer.from_pretrained("meta-llama/Llama-2-7b-hf");
      console.log("Llama tokenizer initialized successfully");
      return true;
    } catch (error) {
      console.error("Failed to initialize Llama tokenizer:", error);
      return false;
    }
  }
  return true;
};

// Tokenize text using the Llama tokenizer
export const tokenizeWithLlama = async (text: string): Promise<Token[]> => {
  if (!llamaTokenizer) {
    const initialized = await initializeLlamaTokenizer();
    if (!initialized) {
      // Fall back to simulation if initialization fails
      return simulateLlamaTokenization(text);
    }
  }
  
  try {
    // Encode the text 
    const encodedTokens = llamaTokenizer.encode(text);
    console.log("Raw Llama tokenization result:", encodedTokens);
    
    // Convert the tokenization result to our Token interface
    const tokens: Token[] = encodedTokens.map((id: number) => ({
      text: llamaTokenizer.decode([id]),
      id: id
    }));
    
    return tokens;
  } catch (error) {
    console.error("Error tokenizing with Llama:", error);
    // Fall back to simulation if tokenization fails
    console.log("Falling back to simulated tokenization");
    return simulateLlamaTokenization(text);
  }
};

// Simplified Llama tokenization simulation as fallback
export const simulateLlamaTokenization = (text: string): Token[] => {
  if (!text) return [];
  
  const tokens: Token[] = [];
  let tokenId = 30000; // Starting with a different range for Llama tokens
  
  // Split by spaces first
  const words = text.split(/(\s+)/);
  
  for (const word of words) {
    if (!word) continue;
    
    // Handle whitespace
    if (/^\s+$/.test(word)) {
      tokens.push({ text: word, id: tokenId++ });
      continue;
    }
    
    // Split by punctuation
    const chunks = word.split(/([.,!?;:()[\]{}"'«»„"‟"'‚'‹›-])/);
    
    for (const chunk of chunks) {
      if (!chunk) continue;
      
      // For very short words, keep them as is
      if (chunk.length <= 2) {
        tokens.push({ text: chunk, id: tokenId++ });
        continue;
      }
      
      // For longer words, simulate subword tokenization
      // Llama's BPE tends to create slightly different chunk sizes than Claude
      let i = 0;
      while (i < chunk.length) {
        // Randomly choose 1-4 characters to simulate subword tokenization
        const chunkSize = Math.min(
          1 + Math.floor(Math.random() * 3), // 1, 2, or 3 characters
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
