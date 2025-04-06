import { Token } from '../types';
import { AutoTokenizer } from '@huggingface/transformers';

// Keep track of tokenizer instance
let llamaTokenizer: any = null;

// Initialize the Llama tokenizer
export const initializeLlamaTokenizer = async () => {
  if (!llamaTokenizer) {
    try {
      // Use a publicly available Llama tokenizer
      // hf-internal-testing/llama-tokenizer is a public test tokenizer that doesn't require auth
      llamaTokenizer = await AutoTokenizer.from_pretrained("hf-internal-testing/llama-tokenizer");
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
      throw new Error("Failed to initialize Llama tokenizer");
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
    throw error; // Propagate the error instead of falling back
  }
};
