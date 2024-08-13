import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import Contact from "./contact.tsx";
import ErrorPage from "./error-page.tsx";
import "./index.css";
import { Ocr } from "./ocr.tsx";
import Root from "./routes/root.tsx";
import { LexicalEditor } from "./lexical-editor.tsx";

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
        element: <LexicalEditor />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
