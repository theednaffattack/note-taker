import {
  AdmonitionDirectiveDescriptor,
  KitchenSinkToolbar,
  MDXEditor,
  MDXEditorMethods,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  directivesPlugin,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  jsxPlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";

import "@mdxeditor/editor/style.css";
import { useRef } from "react";
// import parser from "parser-front-matter";
import fm from "front-matter";
import slugify from "slugify";

// import { AlertProps } from "./alert";
import { imageUploadHandler } from "./image-upload-handler";
import { saveMarkdownHandler } from "./save-markdown-handler";

export function Editor() {
  const ref = useRef<MDXEditorMethods>(null);
  const markdown = ``;

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <button onClick={() => ref.current?.setMarkdown("new markdown")}>
        Set new markdown
      </button>
      <button onClick={() => console.log(ref.current?.getMarkdown())}>
        Get markdown
      </button>

      <button
        onClick={() => ref.current?.insertMarkdown("new markdown to insert")}
      >
        Insert new markdown
      </button>

      <button
        onClick={async (evt) => {
          evt.preventDefault();

          // This if statement prevents a front-matter (fm) error
          // below.
          if (!ref.current) {
            throw Error("The editor is missing its ref!");
          }
          let data = ref.current?.getMarkdown();

          const parsedContent = fm<{ title: string }>(data);
          console.log("WHAT IS PARSED CONTENT", parsedContent);

          let title;
          // Make sure the title property is present
          if (Object.keys(parsedContent.attributes).length === 0) {
            // const missingTitleAlert: AlertProps = {
            //   id: "alert-" + Date.now(),
            //   message: "Please add title to post.",
            //   severity: "warning",
            //   timeout: 2000,
            //   handleDismiss: null,
            // };
            // setAlerts((prevState) => [...prevState, missingTitleAlert]);
          } else {
            title = parsedContent.attributes.title;
            const slug = slugify(title.toLowerCase());

            await saveMarkdownHandler({
              body: data,
              title,
              slug: slug,
            });
          }
        }}
      >
        Save markdown
      </button>

      <MDXEditor
        ref={ref}
        markdown={markdown}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          jsxPlugin(),
          linkPlugin(),
          tablePlugin(),
          imagePlugin(),
          diffSourcePlugin(),
          directivesPlugin(),
          frontmatterPlugin(),
          markdownShortcutPlugin(),
          linkDialogPlugin(),
          diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "boo" }),
          imagePlugin({ imageUploadHandler }),
          directivesPlugin({
            directiveDescriptors: [AdmonitionDirectiveDescriptor],
          }),
          codeBlockPlugin({ defaultCodeBlockLanguage: "ts" }),
          codeMirrorPlugin({
            codeBlockLanguages: { js: "TypeScript", css: "CSS" },
          }),

          toolbarPlugin({
            toolbarContents: () => (
              <>
                <KitchenSinkToolbar />
                {/* <InsertFrontmatter />
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <InsertAdmonition />
                
                <ConditionalContents
                  options={[
                    {
                      when: (editor) => editor?.editorType === "codeblock",
                      contents: () => <ChangeCodeMirrorLanguage />,
                    },
                    {
                      fallback: () => (
                        <>
                          <InsertCodeBlock />
                        </>
                      ),
                    },
                  ]}
                /> */}
              </>
            ),
          }),
        ]}
      />
    </>
  );
}
