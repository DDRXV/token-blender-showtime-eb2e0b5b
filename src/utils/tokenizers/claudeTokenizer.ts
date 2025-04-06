import { Token } from '../types';

// Basic BPE tokenization for Claude (simplified simulation)
export const simulateClaudeBPE = (text: string): Token[] => {
  if (!text) return [];
  
  // This is a simplified simulation of Claude's BPE approach
  // Note: This is not Claude's actual tokenizer, just a demonstration
  
  // Basic rules for this simplified Claude tokenizer simulation:
  // 1. Split on spaces
  // 2. Split remaining chunks into smaller fragments (2-3 characters)
  // 3. Keep punctuation separate
  
  const tokens: Token[] = [];
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
