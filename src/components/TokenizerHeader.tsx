
import React from 'react';
import { TokenizationModel } from '../utils/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TokenizerHeaderProps {
  model: TokenizationModel;
  onModelChange: (value: TokenizationModel) => void;
}

export const TokenizerHeader: React.FC<TokenizerHeaderProps> = ({ model, onModelChange }) => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold text-dyyota-blue mb-1">Token Blender</h1>
      <p className="text-dyyota-darkGray text-sm">
        Compare how different language models tokenize your text
      </p>
      
      {/* Model selection is now handled in the TokenizerInput component */}
    </div>
  );
};
