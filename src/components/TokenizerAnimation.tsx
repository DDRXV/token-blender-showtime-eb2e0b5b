
import React from 'react';
import { BlenderIcon } from './BlenderIcon';
import { TokenizationModel } from '../utils/types';

interface TokenizerAnimationProps {
  isProcessing: boolean;
  model: TokenizationModel;
}

export const TokenizerAnimation: React.FC<TokenizerAnimationProps> = ({ isProcessing, model }) => {
  const getModelDisplayName = (model: TokenizationModel) => {
    switch (model) {
      case 'chatgpt': return 'ChatGPT';
      case 'llama': return 'Llama';
      default: return model;
    }
  };

  return (
    <div className={`transition-all duration-500 ${isProcessing ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      <BlenderIcon isActive={isProcessing} />
      <p className="text-center text-sm text-gray-500 animate-pulse mt-2">
        Tokenizing with {getModelDisplayName(model)} model...
      </p>
    </div>
  );
};
