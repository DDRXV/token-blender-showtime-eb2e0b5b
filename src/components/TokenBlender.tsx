
import React, { useState } from 'react';
import { TokenizerHeader } from './TokenizerHeader';
import { TokenizerInput } from './TokenizerInput';
import { TokenizerAnimation } from './TokenizerAnimation';
import { TokenizerResults } from './TokenizerResults';
import { useTokenizer } from '../hooks/useTokenizer';
import { TokenizationModel } from '../utils/types';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from 'lucide-react';

export const TokenBlender: React.FC = () => {
  const [model, setModel] = useState<TokenizationModel>('chatgpt');
  const {
    isEncodingReady,
    isLlamaReady,
    isProcessing,
    showResults,
    tokens,
    wordCount,
    tokenCount,
    tokenizeText,
    initializationError
  } = useTokenizer();

  const handleTokenize = (text: string) => {
    tokenizeText(text, model);
  };

  // Loading state
  const isLoading = model === 'chatgpt' ? !isEncodingReady : !isLlamaReady;

  // Show initialization status
  const getInitializationStatus = () => {
    if (model === 'chatgpt' && !isEncodingReady) {
      return "Initializing ChatGPT tokenizer... Please wait.";
    }
    if (model === 'llama' && !isLlamaReady) {
      return "Initializing Llama tokenizer... Please wait.";
    }
    return null;
  };

  const initStatus = getInitializationStatus();

  return (
    <div className="w-full max-w-4xl mx-auto">
      <TokenizerHeader 
        model={model}
        onModelChange={setModel}
      />
      
      {initializationError && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            {initializationError} - Please reload the page or try again later.
          </AlertDescription>
        </Alert>
      )}

      {initStatus && (
        <div className="flex items-center gap-2 text-dyyota-blue mb-4 p-2 bg-dyyota-lightBlue/30 rounded">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>{initStatus}</span>
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-5">
        <div className="flex items-center">
          <div className="flex-1">
            <TokenizerInput 
              onTokenize={handleTokenize}
              isProcessing={isProcessing || isLoading}
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
