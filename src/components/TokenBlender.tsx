
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
    <div className="w-full max-w-3xl mx-auto p-4 space-y-8">
      <TokenizerHeader 
        model={model}
        onModelChange={setModel}
      />
      
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
      
      <TokenizerResults 
        showResults={showResults}
        wordCount={wordCount}
        tokenCount={tokenCount}
        model={model}
        tokens={tokens}
      />
    </div>
  );
};

export default TokenBlender;
