
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { TokenizationModel } from '../utils/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TokenizerInputProps {
  onTokenize: (text: string) => void;
  isProcessing: boolean;
  model: TokenizationModel;
  onModelChange: (model: TokenizationModel) => void;
}

export const TokenizerInput: React.FC<TokenizerInputProps> = ({ 
  onTokenize, 
  isProcessing,
  model,
  onModelChange
}) => {
  const [inputText, setInputText] = useState<string>("");

  return (
    <Card className="bg-white shadow-md border-dyyota-lightBlue p-4 mb-4">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <label htmlFor="text-input" className="text-sm font-medium text-dyyota-darkGray">
            Enter text to tokenize:
          </label>
          <div className="w-36">
            <Select 
              value={model}
              onValueChange={(value: TokenizationModel) => onModelChange(value)}
            >
              <SelectTrigger className="bg-dyyota-lightBlue border-dyyota-blue/20">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chatgpt">ChatGPT</SelectItem>
                <SelectItem value="llama">Llama</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-2">
          <Input
            id="text-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your sentence here..."
            className="flex-1 border-dyyota-blue/20 focus-visible:ring-dyyota-blue/30"
            onKeyDown={(e) => {
              if (e.key === 'Enter') onTokenize(inputText);
            }}
          />
          <Button 
            onClick={() => onTokenize(inputText)}
            disabled={isProcessing}
            className="bg-dyyota-blue hover:bg-dyyota-blue/90 text-white"
          >
            Tokenize
          </Button>
        </div>
      </div>
    </Card>
  );
};
