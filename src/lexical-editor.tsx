import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";

import ExampleTheme from "./lexical-example-theme";
import ToolbarPlugin from "./plugins/toolbar-plugin";
import TreeViewPlugin from "./plugins/treeview-plugin";

const placeholder = "Enter some rich text...";

function onError(err: unknown) {
  console.error(err);
}

export function LexicalEditor() {
  const initialConfig = {
    namespace: "Note Taker",
    theme: ExampleTheme,
    onError,
  };
  return (
    <>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900">
        Lexical Editor
      </h1>
      <LexicalComposer initialConfig={initialConfig}>
        <div className="editor-container">
          <ToolbarPlugin />
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  className="editor-input"
                  aria-placeholder={placeholder}
                  placeholder={
                    <div className="editor-placeholder">{placeholder}</div>
                  }
                />
              }
              placeholder={<div>Enter some text...</div>}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <TreeViewPlugin />
          </div>
        </div>
      </LexicalComposer>
    </>
  );
}
