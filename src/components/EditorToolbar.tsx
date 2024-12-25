import React from 'react';
import { Editor } from '@tiptap/react';
import EmojiPicker from 'emoji-picker-react';
import { Button } from './Button';

interface EditorToolbarProps {
  editor: Editor;
  emojiButtonRef: React.RefObject<HTMLDivElement>;
  showEmojiPicker: boolean;
  onEmojiToggle: () => void;
  onEmojiSelect: (emojiData: any) => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  editor,
  emojiButtonRef,
  showEmojiPicker,
  onEmojiToggle,
  onEmojiSelect,
}) => {
  return (
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
        <Button onClick={onEmojiToggle}>😊</Button>
        {showEmojiPicker && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <EmojiPicker 
              onEmojiClick={onEmojiSelect}
              width={350}
              height={400}
            />
          </div>
        )}
      </div>
    </div>
  );
};