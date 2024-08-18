import React, { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/ui/accordion";
import { FileTable } from "./file-table";
import type { LexicalEditor } from "lexical";

export function FileDrawer({
  editorRef,
  listOfPosts,
}: {
  listOfPosts: string[];
  editorRef: React.RefObject<LexicalEditor>;
}) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Load from file</AccordionTrigger>
        <AccordionContent>
          <FileTable editorRef={editorRef} listOfPosts={listOfPosts} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
