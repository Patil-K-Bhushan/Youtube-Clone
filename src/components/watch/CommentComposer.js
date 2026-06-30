import { useState } from "react";

const CommentComposer = ({
  onSubmit,
  onCancel,
  placeholder = "Add a reply...",
  autoFocus = false,
}) => {
  const [text, setText] = useState("");

  const submit = () => {
    const value = text.trim();
    if (!value) return;
    onSubmit(value);
    setText("");
  };

  return (
    <div className="flex flex-1 gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-purple-600 text-sm font-semibold text-white">
        Y
      </div>
      <div className="flex-1">
        <textarea
          rows={1}
          autoFocus={autoFocus}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          className="w-full resize-none border-b border-gray-300 pb-1 text-sm outline-none focus:border-gray-900"
        />
        <div className="mt-2 flex justify-end gap-2">
          {onCancel && (
            <button
              onClick={onCancel}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
          )}
          <button
            onClick={submit}
            disabled={!text.trim()}
            className="rounded-full bg-blue-600 px-3 py-1.5 text-sm font-medium text-white disabled:bg-gray-200 disabled:text-gray-400"
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentComposer;
