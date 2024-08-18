import React from "react";
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  TRANSFORMERS,
} from "@lexical/markdown";

import { Button } from "./components/ui/button";
import { promiser } from "./utils/promiser";
import { saveMarkdownHandler } from "./save-markdown-handler";
import { getListOfPosts } from "./get-list-of-posts";

export function ControlButtons({
  editorRef,
  setShowTreeView,
  setListOfPosts,
}: {
  editorRef: any;
  setShowTreeView: React.Dispatch<React.SetStateAction<boolean>>;
  setListOfPosts: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={async (evt) => {
          evt.preventDefault();
          const editor = editorRef.current;
          // Make sure we have a reference to the target element
          if (!editor) {
            throw Error("EditorState instance is missing!");
          }

          let markdown: string = "";
          editor.read(() => {
            markdown = $convertToMarkdownString(TRANSFORMERS);
            console.log("VIEW MARKDOWN", markdown);
          });
          const [data, dataErr] = await promiser(
            saveMarkdownHandler({
              body: markdown,
              title: "test test",
              slug: "test-test",
            })
          );
          if (!data) {
            if (dataErr) {
              throw dataErr;
            }
            throw "Data is missing, error should have fired!";
          }
          console.log("VIEW SAVED DATA", data);
        }}
      >
        Save Markdown
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={async (evt) => {
          evt.preventDefault();
          const [posts, postsErr] = await promiser(getListOfPosts());
          if (!posts) {
            if (postsErr) {
              throw postsErr;
            }
            throw Error("Posts data is null! An unknown error has occurred.");
          }
          setListOfPosts(posts);
        }}
      >
        Load Markdown
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={(evt) => {
          evt.preventDefault();
          if (editorRef.current) {
            const editor = editorRef.current;

            editor.update(() => {
              $convertFromMarkdownString(`# New Markdown`, TRANSFORMERS);
            });
          }
        }}
      >
        Insert Markdown
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={(evt) => {
          evt.preventDefault();
          setShowTreeView((prevState) => !prevState);
        }}
      >
        Hide Debug View
      </Button>
    </>
  );
}
