import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { useLexicalEditable } from "@lexical/react/useLexicalEditable";
import { useRef, useState } from "react";
import { EditorState } from "lexical";
import type { Klass, LexicalNode } from "lexical";
// import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
// import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import { EditorRefPlugin } from "@lexical/react/LexicalEditorRefPlugin";
// import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";

import { ListItemNode, ListNode } from "@lexical/list";
import { MarkNode } from "@lexical/mark";
import { OverflowNode } from "@lexical/overflow";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { HashtagNode } from "@lexical/hashtag";

import ActionsPlugin from "./plugins/ActionsPlugin";
import AutocompletePlugin from "./plugins/AutocompletePlugin";
import AutoEmbedPlugin from "./plugins/AutoEmbedPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import CodeActionMenuPlugin from "./plugins/CodeActionMenuPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import CollapsiblePlugin from "./plugins/CollapsiblePlugin";
import CommentPlugin from "./plugins/CommentPlugin";
import ComponentPickerPlugin from "./plugins/ComponentPickerPlugin";
import ContextMenuPlugin from "./plugins/ContextMenuPlugin";
import DragDropPaste from "./plugins/DragDropPastePlugin";
import DraggableBlockPlugin from "./plugins/DraggableBlockPlugin";
import EmojiPickerPlugin from "./plugins/EmojiPickerPlugin";
import EmojisPlugin from "./plugins/EmojisPlugin";
import EquationsPlugin from "./plugins/EquationsPlugin";
import ExcalidrawPlugin from "./plugins/ExcalidrawPlugin";
import FigmaPlugin from "./plugins/FigmaPlugin";
import FloatingLinkEditorPlugin from "./plugins/FloatingLinkEditorPlugin";
import FloatingTextFormatToolbarPlugin from "./plugins/FloatingTextFormatToolbarPlugin";
import ImagesPlugin from "./plugins/ImagesPlugin";
import InlineImagePlugin from "./plugins/InlineImagePlugin";
import KeywordsPlugin from "./plugins/KeywordsPlugin";
import { LayoutPlugin } from "./plugins/LayoutPlugin/LayoutPlugin";
import LinkPlugin from "./plugins/LinkPlugin";
import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import MarkdownShortcutPlugin from "./plugins/MarkdownShortcutPlugin";
import { MaxLengthPlugin } from "./plugins/MaxLengthPlugin";
import MentionsPlugin from "./plugins/MentionsPlugin";
import PageBreakPlugin from "./plugins/PageBreakPlugin";
import PollPlugin from "./plugins/PollPlugin";
import SpeechToTextPlugin from "./plugins/SpeechToTextPlugin";
import TabFocusPlugin from "./plugins/TabFocusPlugin";
import TableCellActionMenuPlugin from "./plugins/TableActionMenuPlugin";
import TableCellResizer from "./plugins/TableCellResizer";
import TableHoverActionsPlugin from "./plugins/TableHoverActionsPlugin";
import TableOfContentsPlugin from "./plugins/TableOfContentsPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import TwitterPlugin from "./plugins/TwitterPlugin";
import YouTubePlugin from "./plugins/YouTubePlugin";
import { MyOnChangePlugin } from "./plugins/my-on-change-plugin";

// Nodes below
// import ToolbarPlugin from "./plugins/toolbar-plugin";
// import TreeViewPlugin from "./plugins/treeview-plugin";
import { MATCHERS } from "./plugins/lexical-auto-link-plugin.ts";
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

import { exampleTheme } from "./lexical-example-theme";
import { useSharedHistoryContext } from "./context/shared-history-context.tsx";
import { useSettings } from "./context/settings-context.tsx";
import { ImageNode } from "./nodes/ImageNode.tsx";

const placeholder = "Enter some rich text...";

function onError(err: unknown) {
  console.error(err);
}

export function LexicalEditor() {
  const editorRef = useRef(null);
  const initialConfig = {
    namespace: "Note Taker",
    theme: exampleTheme,
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
    <>
      {/* {isRichText && <ToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />} */}
      <div
        className={`editor-container ${showTreeView ? "tree-view" : ""} ${
          !isRichText ? "plain-text" : ""
        }`}
      >
        {isMaxLength && <MaxLengthPlugin maxLength={30} />}
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900">
          Lexical Editor
        </h1>
        <LexicalComposer initialConfig={initialConfig}>
          <div className="editor-container">
            <ToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />
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
          </div>
        </LexicalComposer>
      </div>
    </>
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
