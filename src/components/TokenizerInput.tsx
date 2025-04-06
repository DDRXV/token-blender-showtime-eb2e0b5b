
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
    <Card className="p-6">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <label htmlFor="text-input" className="text-sm font-medium">
            Enter a sentence:
          </label>
          <div className="w-48">
            <Select 
              value={model}
              onValueChange={(value: TokenizationModel) => onModelChange(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chatgpt">ChatGPT</SelectItem>
                <SelectItem value="claude">Claude</SelectItem>
                <SelectItem value="gemma">Gemma</SelectItem>
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
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter') onTokenize(inputText);
            }}
          />
          <Button 
            onClick={() => onTokenize(inputText)}
            disabled={isProcessing}
          >
            Tokenize
          </Button>
        </div>
      </div>
    </Card>
  );
};
