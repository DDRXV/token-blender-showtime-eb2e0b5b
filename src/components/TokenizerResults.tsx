
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
  isMobile?: boolean;
}

export const TokenizerResults: React.FC<TokenizerResultsProps> = ({
  showResults,
  wordCount,
  tokenCount,
  model,
  tokens,
  isMobile = false
}) => {
  const getModelDisplayName = (model: TokenizationModel) => {
    switch (model) {
      case 'chatgpt': return 'ChatGPT';
      case 'llama': return 'Llama';
      default: return model;
    }
  };

  const getModelDescription = (model: TokenizationModel) => {
    switch (model) {
      case 'chatgpt':
        return 'Uses Byte-level BPE tokenization. This allows it to handle any Unicode text by breaking it into subwords.';
      case 'llama':
        return 'Employs byte-pair encoding with a specialized vocabulary focusing on code and multiple languages.';
    }
  };

  return (
    <div 
      className={`transition-all duration-500 ${showResults ? 'opacity-100' : 'opacity-0'}`}
    >
      <Card className="p-3 sm:p-4 bg-white shadow-md border-dyyota-lightBlue">
        {isMobile ? (
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center">
              <span className="text-xs text-dyyota-blue font-medium">Words</span>
              <p className="font-bold text-lg text-dyyota-darkGray">{wordCount}</p>
            </div>
            <div className="text-center border-x border-dyyota-lightBlue">
              <span className="text-xs text-dyyota-blue font-medium">Tokens</span>
              <p className="font-bold text-lg text-dyyota-darkGray">{tokenCount}</p>
            </div>
            <div className="text-center">
              <span className="text-xs text-dyyota-blue font-medium">Model</span>
              <p className="font-bold text-lg text-dyyota-darkGray">{getModelDisplayName(model)}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center mb-4 px-2">
            <div className="flex items-center gap-6">
              <div>
                <span className="text-xs text-dyyota-blue font-medium">Words</span>
                <p className="font-bold text-lg text-dyyota-darkGray">{wordCount}</p>
              </div>
              <div className="h-10 border-r border-dyyota-lightBlue"></div>
              <div>
                <span className="text-xs text-dyyota-blue font-medium">Tokens</span>
                <p className="font-bold text-lg text-dyyota-darkGray">{tokenCount}</p>
              </div>
              <div className="h-10 border-r border-dyyota-lightBlue"></div>
              <div>
                <span className="text-xs text-dyyota-blue font-medium">Model</span>
                <p className="font-bold text-lg text-dyyota-darkGray">{getModelDisplayName(model)}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-dyyota-lightBlue/30 rounded-lg p-2 sm:p-3 mb-4">
          <h3 className="font-medium text-sm text-dyyota-blue mb-2">Tokens:</h3>
          <div className="flex flex-wrap gap-1.5">
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
        </div>
        
        <div className="text-xs text-dyyota-darkGray/80 bg-dyyota-gray p-2 sm:p-3 rounded-lg">
          <h3 className="font-medium mb-1 text-dyyota-blue">About Tokenization</h3>
          <p>
            Tokens are the basic units that language models process. Understanding tokenization helps optimize prompts and 
            estimate costs for API usage.
          </p>
          <p className="mt-2">
            <strong className="text-dyyota-blue">{getModelDisplayName(model)}:</strong> {' '}
            {getModelDescription(model)}
          </p>
        </div>
      </Card>
    </div>
  );
};
