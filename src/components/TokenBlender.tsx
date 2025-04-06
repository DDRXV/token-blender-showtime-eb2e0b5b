
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
        {/* Input section */}
        <div>
          <TokenizerInput 
            onTokenize={handleTokenize}
            isProcessing={isProcessing || isLoading}
            model={model}
            onModelChange={setModel}
          />
        </div>
        
        {/* Results and animation section */}
        <div className="relative">
          {/* Centered animation that shows during processing */}
          <div className={`absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-500 ${isProcessing ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
              <TokenizerAnimation 
                isProcessing={isProcessing}
                model={model}
              />
            </div>
          </div>
          
          {/* Results with opacity transition */}
          <div className={`transition-opacity duration-500 ${isProcessing ? 'opacity-30' : 'opacity-100'}`}>
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
    </div>
  );
};

export default TokenBlender;
