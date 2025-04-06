
import React, { useState } from 'react';
import { TokenizerHeader } from './TokenizerHeader';
import { TokenizerInput } from './TokenizerInput';
import { TokenizerAnimation } from './TokenizerAnimation';
import { TokenizerResults } from './TokenizerResults';
import { useTokenizer } from '../hooks/useTokenizer';
import { TokenizationModel } from '../utils/types';

export const TokenBlender: React.FC = () => {
  const [model, setModel] = useState<TokenizationModel>('chatgpt');
  const {
    isProcessing,
    showResults,
    tokens,
    wordCount,
    tokenCount,
    tokenizeText,
  } = useTokenizer();

  const handleTokenize = (text: string) => {
    tokenizeText(text, model);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <TokenizerHeader 
        model={model}
        onModelChange={setModel}
      />
      
      <div className="grid grid-cols-1 gap-5">
        <div className="flex items-center">
          <div className="flex-1">
            <TokenizerInput 
              onTokenize={handleTokenize}
              isProcessing={isProcessing}
              model={model}
              onModelChange={setModel}
            />
          </div>
          <div className="w-24">
            <TokenizerAnimation 
              isProcessing={isProcessing}
              model={model}
            />
          </div>
        </div>
        
        <div>
          <TokenizerResults 
            showResults={showResults}
            wordCount={wordCount}
            tokenCount={tokenCount}
            model={model}
            tokens={tokens}
          />
        </div>
      </div>
    </div>
  );
};

export default TokenBlender;
