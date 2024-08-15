import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Prism from "prismjs/components/prism-core";
import Prism from "prismjs";

// Need this to fix the Lexical / Vite Prisma issue
// found here: https://github.com/remix-run/remix/discussions/8182#discussioncomment-9220264
if (typeof globalThis.Prism === "undefined") {
  globalThis.Prism = Prism;
}

import App from "./App.tsx";
import Contact from "./contact.tsx";
import ErrorPage from "./error-page.tsx";
import "./index.css";
import { Ocr } from "./ocr.tsx";
import Root from "./routes/root.tsx";
import { LexicalEditor, nodes } from "./lexical-editor.tsx";
import { FlashMessageContext } from "./context/flash-message-context.tsx";
import { SettingsContext } from "./context/settings-context.tsx";
import { $convertFromMarkdownString, TRANSFORMERS } from "@lexical/markdown";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import theme from "./themes/playground-editor-theme.tsx";

function onError(err: unknown) {
  console.error(err);
}

const markdown = `# Hello World!\n\nEddie's first test!`;

const initialConfig = {
  editorState: () => $convertFromMarkdownString(markdown, TRANSFORMERS),
  namespace: "Note Taker",
  theme,
  onError,
  nodes: [...nodes],
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
      {
        path: "/write",
        element: <App />,
      },
      {
        path: "/ocr",
        element: <Ocr />,
      },
      {
        path: "/lexical",
        element: (
          <LexicalComposer initialConfig={initialConfig}>
            <SettingsContext>
              <FlashMessageContext>
                <LexicalEditor />
              </FlashMessageContext>
            </SettingsContext>
          </LexicalComposer>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
