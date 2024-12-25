import { useState } from 'react';
import { RichTextEditor } from './components/RichTextEditor';
import { FormattedOutput } from './components/FormattedOutput';
import { formatText } from './utils/textFormatters';

export default function App() {
  const [inputText, setInputText] = useState('');

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <img src="/logo.svg" alt="LinkedIn Text Formatter Logo" className="w-[200px] mx-auto mb-8" />
          <h1 className="text-[1.95rem] leading-[2.5rem] font-[500]">LinkedIn Text Formatter</h1>
        </div>
        
        <div className="text-center mb-4 text-gray-600">
          <p>Use the formatting buttons or keyboard shortcuts:</p>
          <p><kbd>Ctrl</kbd>+<kbd>B</kbd> for bold, <kbd>Ctrl</kbd>+<kbd>I</kbd> for italics</p>
        </div>

        <RichTextEditor
          value={inputText}
          onChange={setInputText}
          label="Insert/paste your text here..."
        />

        <FormattedOutput text={formatText(inputText)} />
      </div>
    </div>
  );
}