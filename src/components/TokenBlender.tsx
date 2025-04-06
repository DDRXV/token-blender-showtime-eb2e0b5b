
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
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <TokenizerHeader 
        model={model}
        onModelChange={setModel}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <TokenizerInput 
            onTokenize={handleTokenize}
            isProcessing={isProcessing}
            model={model}
            onModelChange={setModel}
          />
          
          <TokenizerAnimation 
            isProcessing={isProcessing}
            model={model}
          />
        </div>
        
        <div className="lg:col-span-2">
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
