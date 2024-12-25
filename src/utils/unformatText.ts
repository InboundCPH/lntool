import { specialChars, StyleType } from './characterMaps';

const createReverseMapping = () => {
  const reverseMap = new Map<string, { char: string; style: StyleType }>();
  
  Object.entries(specialChars).forEach(([style, charSets]) => {
    // Map uppercase characters
    if (charSets.upper) {
      for (let i = 0; i < 26; i++) {
        const decoratedChar = String.fromCodePoint(charSets.upper.start.codePointAt(0)! + i);
        const plainChar = String.fromCodePoint(charSets.upper.base.charCodeAt(0) + i);
        reverseMap.set(decoratedChar, { char: plainChar, style: style as StyleType });
      }
    }
    
    // Map lowercase characters
    if (charSets.lower) {
      for (let i = 0; i < 26; i++) {
        const decoratedChar = String.fromCodePoint(charSets.lower.start.codePointAt(0)! + i);
        const plainChar = String.fromCodePoint(charSets.lower.base.charCodeAt(0) + i);
        reverseMap.set(decoratedChar, { char: plainChar, style: style as StyleType });
      }
    }
    
    // Map numbers for bold
    if (style === 'bold' && 'numbers' in charSets) {
      for (let i = 0; i < 10; i++) {
        const decoratedChar = String.fromCodePoint(charSets.numbers.start.codePointAt(0)! + i);
        reverseMap.set(decoratedChar, { char: i.toString(), style: 'bold' });
      }
    }
  });
  
  return reverseMap;
};

const reverseCharMap = createReverseMapping();

export const unformatText = (text: string, toMarkdown = false): string => {
  let result = '';
  let currentStyle: StyleType | null = null;
  let styleBuffer = '';
  
  const flushBuffer = () => {
    if (styleBuffer) {
      if (toMarkdown) {
        if (currentStyle === 'bold') {
          result += `**${styleBuffer}**`;
        } else if (currentStyle === 'italic') {
          result += `*${styleBuffer}*`;
        }
      } else {
        result += styleBuffer;
      }
      styleBuffer = '';
    }
  };
  
  for (const char of text) {
    const mapping = reverseCharMap.get(char);
    
    if (mapping) {
      if (currentStyle !== mapping.style) {
        flushBuffer();
        currentStyle = mapping.style;
      }
      styleBuffer += mapping.char;
    } else {
      flushBuffer();
      currentStyle = null;
      result += char;
    }
  }
  
  flushBuffer();
  return result;
};