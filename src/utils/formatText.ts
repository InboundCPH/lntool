import { specialChars, StyleType, SpecialChar } from './characterMaps';

const formatChar = (char: string, style: StyleType): string => {
  // Check for special characters first
  if (char in specialChars[style].special) {
    return specialChars[style].special[char as SpecialChar];
  }

  const isUpper = char >= 'A' && char <= 'Z';
  const isLower = char >= 'a' && char <= 'z';
  const isNumber = char >= '0' && char <= '9';
  
  if (!isUpper && !isLower && !isNumber) return char;
  
  if (isNumber && style === 'bold') {
    const offset = char.charCodeAt(0) - '0'.charCodeAt(0);
    return String.fromCodePoint(specialChars[style].numbers.start.codePointAt(0)! + offset);
  }
  
  const charSet = isUpper ? specialChars[style].upper : specialChars[style].lower;
  const baseChar = isUpper ? 'A' : 'a';
  const offset = char.charCodeAt(0) - baseChar.charCodeAt(0);
  
  return String.fromCodePoint(charSet.start.codePointAt(0)! + offset);
};

export const formatText = (text: string): string => {
  // Split text into paragraphs while preserving empty lines
  const paragraphs = text.split(/\n/).map(line => {
    // Process markdown formatting
    let result = line;
    
    // Convert strong/bold text
    result = result.replace(/\*\*(.*?)\*\*/g, (_: string, match: string) => {
      return match.split('').map((char: string) => formatChar(char, 'bold')).join('');
    });
    
    // Convert em/italic text
    result = result.replace(/\*(.*?)\*/g, (_: string, match: string) => {
      return match.split('').map((char: string) => formatChar(char, 'italic')).join('');
    });
    
    // Remove any remaining HTML tags
    result = result.replace(/<[^>]+>/g, '');
    
    return result;
  });
  
  // Join paragraphs with line breaks, preserving empty lines
  return paragraphs.join('\n');
};