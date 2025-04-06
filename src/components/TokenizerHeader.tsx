
import React from 'react';
import { TokenizationModel } from '../utils/types';
import { useIsMobile } from '../hooks/use-mobile';

interface TokenizerHeaderProps {
  model: TokenizationModel;
  onModelChange: (value: TokenizationModel) => void;
}

export const TokenizerHeader: React.FC<TokenizerHeaderProps> = ({ model, onModelChange }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="text-center mb-4">
      <h1 className="text-xl sm:text-2xl font-bold text-dyyota-blue">Token Blender</h1>
      <p className="text-dyyota-darkGray text-xs sm:text-sm mt-1">
        Compare how different language models tokenize your text
      </p>
    </div>
  );
};
