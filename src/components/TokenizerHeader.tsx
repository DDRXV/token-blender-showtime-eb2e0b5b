
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
      <h1 className="text-3xl font-bold text-blender-primary mb-3">Token Blender</h1>
      <p className="text-gray-600 mb-6">
        Compare how different language models tokenize your text
      </p>
    </div>
  );
};
