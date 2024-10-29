import { useRef, useState, useEffect } from "react";
import "./Editor.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
  SourceEditing,
  Markdown,
  Autoformat,
  Heading,
  HeadingEditing,
  Table,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";
const Editor = ({ message }) => {
  const editorRef = useRef(null);

  const [editorData, setEditorData] = useState(message);
  const [data, setData] = useState("");

  useEffect(() => {
    const targetElement = document.getElementById("target-content");

    // // Make the target element non-editable
    if (targetElement) {
      targetElement.setAttribute("contenteditable", "false");
    }
    // Helper function to update the target content
    const updateTargetContent = () => {
      const sourceElement =
        document.getElementsByClassName("ck ck-editor__main")[0];
      if (sourceElement && targetElement) {
        targetElement.innerHTML = sourceElement.innerHTML;
      }
    };

    // Initial check to wait for the editor to load
    const checkEditorLoaded = setInterval(() => {
      const sourceElement =
        document.getElementsByClassName("ck ck-editor__main")[0];
      if (sourceElement) {
        clearInterval(checkEditorLoaded); // Stop checking once loaded
        updateTargetContent(); // Update with initial content
      }
    }, 100); // Check every 100ms

    // Set up MutationObserver to watch for changes in the editor
    const observer = new MutationObserver(() => updateTargetContent());

    // Observe changes if the editor has loaded
    const editorContainer =
      document.getElementsByClassName("ck ck-editor__main")[0];
    if (editorContainer) {
      observer.observe(editorContainer, { childList: true, subtree: true });
    }

    // Clean up intervals and observer on unmount
    return () => {
      clearInterval(checkEditorLoaded);
      observer.disconnect();
    };
  }, [editorData]);

  return (
    <div>
      <div className='container'>
        <div className='row p-4 '>
          <div className='col-md-6 col-12'>
            <div className='editor-container-left'>
              <CKEditor
                ref={editorRef}
                editor={ClassicEditor}
                data={editorData}
                onChange={(event, editor) => {
                  console.log("event", event);
                  console.log("editor", editor);
                  const data = editor.getData();
                  setEditorData(data);
                }}
                config={{
                  allowedContent: true,
                  extraPlugins: [SourceEditing],
                  toolbar: {
                    items: [
                      "undo",
                      "redo",
                      "|",
                      "bold",
                      "italic",
                      "SourceEditing",
                      "Heading",
                    ],
                  },
                  plugins: [
                    Bold,
                    Essentials,
                    Italic,
                    Mention,
                    Paragraph,
                    Markdown,
                    Table,
                    Undo,
                    SourceEditing,
                    Autoformat,
                    Heading,
                    HeadingEditing,
                  ],
                  // licenseKey: "<YOUR_LICENSE_KEY>",
                  mention: {
                    // Mention configuration
                  },
                  initialData: editorData,
                }}
              />
            </div>
          </div>
          <div className='col-md-6 col-12'>
            <div className='editor-container-right shadow' id='target-content'>
              {/* <div dangerouslySetInnerHTML={{ __html: data }} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
