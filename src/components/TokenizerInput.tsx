
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
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
      <h2 className="text-md font-medium text-dyyota-blue mb-2">Enter text to tokenize:</h2>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Select 
            value={model}
            onValueChange={(value: TokenizationModel) => onModelChange(value)}
          >
            <SelectTrigger className="w-32 bg-dyyota-lightBlue border-dyyota-blue/20">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="chatgpt">ChatGPT</SelectItem>
              <SelectItem value="llama">Llama</SelectItem>
            </SelectContent>
          </Select>
          
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your sentence here..."
            className="flex-1 min-h-[60px] border-dyyota-blue/20 focus-visible:ring-dyyota-blue/30"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey) onTokenize(inputText);
            }}
          />
          
          <Button 
            onClick={() => onTokenize(inputText)}
            disabled={isProcessing}
            className="bg-dyyota-blue hover:bg-dyyota-blue/90 text-white self-end"
          >
            Tokenize
          </Button>
        </div>
        <div className="text-xs text-dyyota-darkGray/60">
          Ctrl+Enter to tokenize | Select a model and enter text to see tokens
        </div>
      </div>
    </Card>
  );
};
