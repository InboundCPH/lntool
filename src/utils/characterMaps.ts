export const specialChars = {
  bold: { 
    upper: { start: '𝗔', base: 'A' },
    lower: { start: '𝗮', base: 'a' },
    numbers: { start: '𝟬', base: '0' },
    special: {
      'æ': '𝗮𝗲',
      'ø': '𝗼𝗲',
      'å': '𝗮𝗮',
      'Æ': '𝗔𝗘',
      'Ø': '𝗢𝗘',
      'Å': '𝗔𝗔'
    } as const
  },
  italic: { 
    upper: { start: '𝘈', base: 'A' },
    lower: { start: '𝘢', base: 'a' },
    special: {
      'æ': '𝘢𝘦',
      'ø': '𝘰𝘦',
      'å': '𝘢𝘢',
      'Æ': '𝘈𝘌',
      'Ø': '𝘖𝘌',
      'Å': '𝘈𝘈'
    } as const
  }
} as const;

export type StyleType = keyof typeof specialChars;
export type SpecialChar = keyof typeof specialChars.bold.special;