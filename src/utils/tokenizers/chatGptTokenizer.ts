
import { Token } from '../types';
import { get_encoding } from 'tiktoken';

export const tokenizeWithChatGPT = async (text: string): Promise<Token[]> => {
  console.log("Creating OpenAI encoding...");
  const encoding = await get_encoding("cl100k_base");
  console.log("Encoding created");
  
  const tokensList: Token[] = [];
  
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
  return tokensList;
};
