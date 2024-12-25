import { useEffect, useState, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { Button } from './Button';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

const convertToMarkdown = (html: string): string => {
  return html
    .replace(/<hr[^>]*>/g, '\n\n') // Replace <hr> elements with line breaks
    .replace(/<p[^>]*>/g, '')
    .replace(/<\/p>/g, '\n\n')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/g, '**$1**\n') // Convert headings to bold text and add line break
    .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
    .replace(/<em>(.*?)<\/em>/g, '*$1*')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

const parseMarkdown = (markdown: string): string => {
  const lines = markdown.split('\n');
  return lines
    .map(line => {
      if (line.startsWith('###### ')) {
        return `<h6>${line.substring(7)}</h6>`;
      } else if (line.startsWith('##### ')) {
        return `<h5>${line.substring(6)}</h5>`;
      } else if (line.startsWith('#### ')) {
        return `<h4>${line.substring(5)}</h4>`;
      } else if (line.startsWith('### ')) {
        return `<h3>${line.substring(4)}</h3>`;
      } else if (line.startsWith('## ')) {
        return `<h2>${line.substring(3)}</h2>`;
      } else if (line.startsWith('# ')) {
        return `<h1>${line.substring(2)}</h1>`;
      } else if (line.trim()) {
        return `<p>${line}</p>`;
      } else {
        return '<p><br></p>';
      }
    })
    .join('');
};

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, label }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiButtonRef = useRef<HTMLDivElement>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        // heading: false, // Enable heading extension by removing this line
        paragraph: {
          HTMLAttributes: {
            class: 'mb-4'
          }
        }
      }),
      TextStyle,
    ],
    content: parseMarkdown(value),
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const markdown = convertToMarkdown(html);
      onChange(markdown);
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none'
      }
    }
  });

  useEffect(() => {
    if (editor && value !== convertToMarkdown(editor.getHTML())) {
      editor.commands.setContent(parseMarkdown(value));
    }
  }, [value, editor]);

  const onEmojiClick = (emojiData: EmojiClickData) => {
    if (editor) {
      editor.commands.insertContent(emojiData.emoji);
      setShowEmojiPicker(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiButtonRef.current && 
        !emojiButtonRef.current.contains(event.target as Node) &&
        editorContainerRef.current &&
        !editorContainerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full" ref={editorContainerRef}>
      <div className="mb-2">
        <label className="block text-gray-700 text-base font-semibold">{label}</label>
      </div>
      <div className="border-2 border-gray-300 rounded-lg">
        <div className="bg-gray-50 border-b-2 border-gray-300 p-2 flex gap-2">
          <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive('bold')}
          >
            Bold
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive('italic')}
          >
            Italic
          </Button>
          <div ref={emojiButtonRef} className="relative ml-auto">
            <Button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              😊
            </Button>
            {showEmojiPicker && (
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                <EmojiPicker 
                  onEmojiClick={onEmojiClick}
                  width={350}
                  height={400}
                />
              </div>
            )}
          </div>
        </div>
        <EditorContent 
          editor={editor} 
          className="p-4"
        />
      </div>
    </div>
  );
};
