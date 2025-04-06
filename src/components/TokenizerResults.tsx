
import React from 'react';
import { Card } from '@/components/ui/card';
import { TokenizationModel } from '../utils/types';
import { TokenDisplay } from './TokenDisplay';
import { TOKEN_COLORS } from '../utils/tokenColors';
import { Token } from '../utils/types';

interface TokenizerResultsProps {
  showResults: boolean;
  wordCount: number;
  tokenCount: number;
  model: TokenizationModel;
  tokens: Token[];
}

export const TokenizerResults: React.FC<TokenizerResultsProps> = ({
  showResults,
  wordCount,
  tokenCount,
  model,
  tokens
}) => {
  const getModelDisplayName = (model: TokenizationModel) => {
    switch (model) {
      case 'chatgpt': return 'ChatGPT';
      case 'claude': return 'Claude';
      case 'gemma': return 'Gemma';
      case 'llama': return 'Llama';
      default: return model;
    }
  };

  const getModelDescription = (model: TokenizationModel) => {
    switch (model) {
      case 'chatgpt':
        return 'Uses Byte-level BPE tokenization. This allows it to handle any Unicode text by breaking it into subwords.';
      case 'claude':
        return 'Typically uses a more granular BPE tokenization, often breaking words into smaller pieces than ChatGPT.';
      case 'gemma':
        return 'Uses SentencePiece tokenization trained on multilingual data with a vocabulary size optimized for efficiency.';
      case 'llama':
        return 'Employs byte-pair encoding with a specialized vocabulary focusing on code and multiple languages.';
    }
  };

  return (
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
            <p className="font-bold text-lg">{getModelDisplayName(model)}</p>
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
          <strong>{getModelDisplayName(model)} tokenization:</strong> {' '}
          {getModelDescription(model)}
        </p>
      </div>
    </div>
  );
};
