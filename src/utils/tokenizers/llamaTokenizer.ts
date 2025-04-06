import { Token } from '../types';

// Simplified Llama tokenization simulation
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
