import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { LexicalEditor } from "lexical";
import { $convertFromMarkdownString, TRANSFORMERS } from "@lexical/markdown";
import { promiser } from "./utils/promiser";
import { getSinglePost } from "./get-single-post";

export function FileTable({
  editorRef,
  listOfPosts,
}: {
  listOfPosts: string[];
  editorRef: React.RefObject<LexicalEditor>;
}) {
  return (
    <Table>
      <TableBody>
        {listOfPosts &&
          listOfPosts.map((filename, filenameIndex) => {
            return (
              <TableRow key={filenameIndex + "-saved-posts"}>
                <TableCell className="font-medium">
                  <span
                    onClick={async (evt) => {
                      console.log("CLCIK FIRING", filename);
                      evt.preventDefault();
                      if (editorRef.current) {
                        const editor = editorRef.current;
                        const [postStr, postStrErr] = await promiser(
                          getSinglePost(filename)
                        );
                        console.log("VIEW POST STRING", postStr);
                        if (!postStr) {
                          if (postStrErr) {
                            throw postStrErr;
                          }
                          throw Error("Could not retrieve file contents!");
                        }
                        editor.update(() => {
                          $convertFromMarkdownString(postStr, TRANSFORMERS);
                        });
                      }
                    }}
                  >
                    {filename}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}
