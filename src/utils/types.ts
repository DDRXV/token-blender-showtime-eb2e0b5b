
export type TokenizationModel = 'chatgpt' | 'claude' | 'gemma' | 'llama';

export interface Token {
  text: string;
  id: number;
}
