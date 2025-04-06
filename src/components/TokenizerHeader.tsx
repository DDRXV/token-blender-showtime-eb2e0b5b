
import React from 'react';
import { TokenizationModel } from '../utils/types';

interface TokenizerHeaderProps {
  model: TokenizationModel;
  onModelChange: (value: TokenizationModel) => void;
}

export const TokenizerHeader: React.FC<TokenizerHeaderProps> = ({ model, onModelChange }) => {
  return (
    <div className="text-center mb-2">
      <h1 className="text-xl font-bold text-dyyota-blue">Token Blender</h1>
      <p className="text-dyyota-darkGray text-xs">
        Compare how different language models tokenize your text
      </p>
    </div>
  );
};
