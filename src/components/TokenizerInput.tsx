
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { TokenizationModel } from '../utils/types';
import { ChevronDown } from 'lucide-react';
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
  isMobile?: boolean;
}

export const TokenizerInput: React.FC<TokenizerInputProps> = ({ 
  onTokenize, 
  isProcessing,
  model,
  onModelChange,
  isMobile = false
}) => {
  const [inputText, setInputText] = useState<string>("");

  return (
    <Card className="bg-white shadow-md border-dyyota-lightBlue p-3 sm:p-4 mb-4">
      <h2 className="text-md font-medium text-dyyota-blue mb-2 sm:mb-3">Enter text to tokenize:</h2>
      <div className="flex flex-col gap-3">
        {isMobile ? (
          <>
            <div className="flex justify-between items-center gap-2">
              <Select 
                value={model}
                onValueChange={(value: TokenizationModel) => onModelChange(value)}
              >
                <SelectTrigger className="w-full h-10 bg-dyyota-lightBlue border-dyyota-blue/20">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chatgpt">ChatGPT</SelectItem>
                  <SelectItem value="llama">Llama</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                onClick={() => onTokenize(inputText)}
                disabled={isProcessing}
                className="bg-dyyota-blue hover:bg-dyyota-blue/90 text-white h-10 whitespace-nowrap transition-all"
              >
                Tokenize
              </Button>
            </div>
            
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your sentence here..."
              className="min-h-[80px] border-dyyota-blue/20 focus-visible:ring-dyyota-blue/30 resize-none py-2"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.ctrlKey) onTokenize(inputText);
              }}
            />
          </>
        ) : (
          <div className="flex items-end gap-3">
            <div>
              <Select 
                value={model}
                onValueChange={(value: TokenizationModel) => onModelChange(value)}
              >
                <SelectTrigger className="w-32 h-10 bg-dyyota-lightBlue border-dyyota-blue/20">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chatgpt">ChatGPT</SelectItem>
                  <SelectItem value="llama">Llama</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your sentence here..."
                className="min-h-[40px] border-dyyota-blue/20 focus-visible:ring-dyyota-blue/30 resize-none h-10 py-2"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.ctrlKey) onTokenize(inputText);
                }}
              />
            </div>
            
            <Button 
              onClick={() => onTokenize(inputText)}
              disabled={isProcessing}
              className="bg-dyyota-blue hover:bg-dyyota-blue/90 text-white h-10 px-4 transition-all"
            >
              Tokenize
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
