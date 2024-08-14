import { AutoLinkNode, LinkNode } from "@lexical/link";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { LexicalContentEditable as ContentEditable } from "./ui/content-editable.tsx";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import type { Klass, LexicalNode } from "lexical";
import { useRef, useState } from "react";
// import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
// import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import { EditorRefPlugin } from "@lexical/react/LexicalEditorRefPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
// import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";

import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { HashtagNode } from "@lexical/hashtag";
import { ListItemNode, ListNode } from "@lexical/list";
import { MarkNode } from "@lexical/mark";
import { OverflowNode } from "@lexical/overflow";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";

import ActionsPlugin from "./plugins/ActionsPlugin";
import AutocompletePlugin from "./plugins/AutocompletePlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import ContextMenuPlugin from "./plugins/ContextMenuPlugin";
import LinkPlugin from "./plugins/LinkPlugin";
import MarkdownShortcutPlugin from "./plugins/MarkdownShortcutPlugin";
import { MaxLengthPlugin } from "./plugins/MaxLengthPlugin";
import TableOfContentsPlugin from "./plugins/TableOfContentsPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import TreeViewPlugin from "./plugins/TreeViewPlugin";

// Nodes below
// import ToolbarPlugin from "./plugins/toolbar-plugin";
// import TreeViewPlugin from "./plugins/treeview-plugin";
// import { ImageNode } from "@mdxeditor/editor";
import { AutocompleteNode } from "./nodes/AutocompleteNode.tsx";
import { EmojiNode } from "./nodes/EmojiNode.tsx";
import { EquationNode } from "./nodes/EquationNode.tsx";
import { ExcalidrawNode } from "./nodes/ExcalidrawNode/index.tsx";
import { FigmaNode } from "./nodes/FigmaNode.tsx";
import { InlineImageNode } from "./nodes/InlineImageNode/InlineImageNode.tsx";
import { KeywordNode } from "./nodes/KeywordNode.ts";
import { LayoutContainerNode } from "./nodes/LayoutContainerNode.ts";
import { LayoutItemNode } from "./nodes/LayoutItemNode.ts";
import { MentionNode } from "./nodes/MentionNode.ts";
import { PageBreakNode } from "./nodes/PageBreakNode/index.tsx";
import { PollNode } from "./nodes/PollNode.tsx";
import { StickyNode } from "./nodes/StickyNode.tsx";
import { TweetNode } from "./nodes/TweetNode.tsx";
import { YouTubeNode } from "./nodes/YouTubeNode.tsx";
import { CollapsibleContainerNode } from "./plugins/collapsible-plugin/collapsible-container-node.ts";
import { CollapsibleContentNode } from "./plugins/collapsible-plugin/collapsible-content-node.ts";
import { CollapsibleTitleNode } from "./plugins/collapsible-plugin/collapsible-title-node.ts";

import { CharacterLimitPlugin } from "@lexical/react/LexicalCharacterLimitPlugin";
import { useSettings } from "./context/settings-context.tsx";
import { SharedAutocompleteContext } from "./context/shared-auto-complete.tsx";
import {
  SharedHistoryContext,
  useSharedHistoryContext,
} from "./context/shared-history-context.tsx";
import { ImageNode } from "./nodes/ImageNode.tsx";
import { TableContext } from "./plugins/table-plugin.tsx";
import theme from "./themes/playground-editor-theme.tsx";
import { $convertFromMarkdownString, TRANSFORMERS } from "@lexical/markdown";
import { Button } from "./components/ui/button.tsx";

const placeholder = "Enter some rich text...";

function onError(err: unknown) {
  console.error(err);
}
const markdown = `# Hello World!\n\nEddie's first test!`;

export function LexicalEditor() {
  const editorRef = useRef(null);
  const initialConfig = {
    editorState: () => $convertFromMarkdownString(markdown, TRANSFORMERS),
    namespace: "Note Taker",
    theme,
    onError,
    nodes: [...nodes],
  };

  const { historyState } = useSharedHistoryContext();
  const {
    settings: {
      isCollab,
      isAutocomplete,
      isMaxLength,
      isCharLimit,
      isCharLimitUtf8,
      isRichText,
      showTreeView,
      showTableOfContents,
      shouldUseLexicalContextMenu,
      shouldPreserveNewLinesInMarkdown,
      tableCellMerge,
      tableCellBackgroundColor,
    },
  } = useSettings();
  // const isEditable = useLexicalEditable();
  const placeholder = isCollab
    ? "Enter some collaborative rich text..."
    : isRichText
    ? "Enter some rich text..."
    : "Enter some plain text...";
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);
  const [isSmallWidthViewport, setIsSmallWidthViewport] =
    useState<boolean>(false);
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

  const [_editorState, setEditorState] = useState<string>("");

  // function onChange(editorState: EditorState) {
  //   // Call toJSON on the EditorState object, which produces a serialization safe string
  //   const editorStateJSON = editorState.toJSON();
  //   // However, we still have a JavaScript object, so we need to convert it to an actual string with JSON.stringify
  //   setEditorState(JSON.stringify(editorStateJSON));
  // }
  return (
    <div className="editor-shell">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900">
        Lexical Editor
      </h1>

      <Button type="button" variant="outline">
        Save Markdown
      </Button>
      <Button type="button" variant="outline">
        Load Markdown
      </Button>
      {/* {isRichText && <ToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />} */}
      <div
      // className={`editor-container ${showTreeView ? "tree-view" : ""} ${
      //   !isRichText ? "plain-text" : ""
      // }`}
      >
        {isMaxLength && <MaxLengthPlugin maxLength={30} />}
        <LexicalComposer initialConfig={initialConfig}>
          <SharedHistoryContext>
            <TableContext>
              <SharedAutocompleteContext>
                {isRichText && (
                  <ToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />
                )}
                <div
                  className={`editor-container ${
                    showTreeView ? "tree-view" : ""
                  } ${!isRichText ? "plain-text" : ""}`}
                >
                  <div className="editor-inner">
                    <RichTextPlugin
                      contentEditable={
                        <div className="editor-scroller">
                          <div className="editor" ref={editorRef}>
                            <ContentEditable
                              className="ContentEditable__root"
                              aria-placeholder={placeholder}
                              placeholder={placeholder}
                            />
                          </div>
                        </div>
                      }
                      ErrorBoundary={LexicalErrorBoundary}
                    />
                    <HistoryPlugin />
                    <AutoFocusPlugin />
                    <TreeViewPlugin />
                    <LinkPlugin />
                    <ListPlugin />
                    <CheckListPlugin />
                    <TablePlugin />
                    <TabIndentationPlugin />
                    <AutoLinkPlugin />
                    <ClearEditorPlugin />
                    <MarkdownShortcutPlugin />
                    <EditorRefPlugin editorRef={editorRef} />
                    {/* <MyOnChangePlugin onChange={onChange} /> */}
                  </div>
                  {(isCharLimit || isCharLimitUtf8) && (
                    <CharacterLimitPlugin
                      charset={isCharLimit ? "UTF-16" : "UTF-8"}
                      maxLength={5}
                    />
                  )}
                  {isAutocomplete && <AutocompletePlugin />}
                  <div>{showTableOfContents && <TableOfContentsPlugin />}</div>
                  {shouldUseLexicalContextMenu && <ContextMenuPlugin />}
                  <ActionsPlugin
                    isRichText={isRichText}
                    shouldPreserveNewLinesInMarkdown={
                      shouldPreserveNewLinesInMarkdown
                    }
                  />
                </div>
              </SharedAutocompleteContext>
            </TableContext>
          </SharedHistoryContext>
        </LexicalComposer>
      </div>
    </div>
  );
}

export const nodes: Array<Klass<LexicalNode>> = [
  AutocompleteNode,
  AutoLinkNode,
  CodeHighlightNode,
  CodeNode,
  CollapsibleContainerNode,
  CollapsibleContentNode,
  CollapsibleTitleNode,
  EmojiNode,
  ExcalidrawNode,
  EquationNode,
  FigmaNode,
  HashtagNode,
  HeadingNode,
  HorizontalRuleNode,
  ImageNode,
  InlineImageNode,
  KeywordNode,
  LayoutContainerNode,
  LayoutItemNode,
  LinkNode,
  ListItemNode,
  ListNode,
  MarkNode,
  MentionNode,
  OverflowNode,
  PageBreakNode,
  PollNode,
  QuoteNode,
  StickyNode,
  TableNode,
  TableCellNode,
  TableRowNode,
  // ImageNode,
  TweetNode,
  YouTubeNode,
];
