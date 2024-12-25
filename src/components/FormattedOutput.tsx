import React from 'react';
import linkedinIcon from '../assets/linkedin-icon.svg';
import { CopyButton } from './CopyButton';

interface FormattedOutputProps {
  text: string;
}

export const FormattedOutput: React.FC<FormattedOutputProps> = ({ text }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <img src={linkedinIcon} alt="LinkedIn" className="w-7 h-7" />
          <label className="text-gray-700 text-base font-semibold ml-1">formatted text</label>
        </div>
        <CopyButton text={text} />
      </div>
      <div className="w-full p-4 bg-gray-50 border-2 border-gray-300 rounded-lg min-h-[100px] whitespace-pre-wrap font-sans break-words leading-relaxed text-base mb-4">
        {text}
      </div>
      <p className="text-gray-600 text-sm italic text-center">
        This tool is developed by InboundCPH and is used at your own risk. Please report any bugs to{' '}
        <a href="mailto:support@inboundcph.dk" className="text-blue-500 hover:text-blue-600">
          support@inboundcph.dk
        </a>
        . © 2024 InboundCPH A/S. All rights reserved.
      </p>
    </div>
  );
};