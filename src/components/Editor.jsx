// import { useRef, useState, useEffect } from "react";
// import "./Editor.css";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import {
//   ClassicEditor,
//   Essentials,
//   Autoformat,
//   BlockQuote,
//   Bold,
//   CloudServices,
//   Code,
//   CodeBlock,
//   Heading,
//   HorizontalLine,
//   Image,
//   ImageToolbar,
//   ImageUpload,
//   Base64UploadAdapter,
//   Italic,
//   Link, // To make Link
//   List, // Bullet and numbered lists
//   Markdown,
//   Mention,
//   Paragraph,
//   SourceEditing,
//   SpecialCharacters,
//   SpecialCharactersEssentials,
//   Strikethrough,
//   Table,
//   TableToolbar,
//   TextTransformation,
//   TodoList,
// } from "ckeditor5";

// import "ckeditor5/ckeditor5.css";
// const Editor = ({ message }) => {
//   const editorRef = useRef(null);

//   const [editorData, setEditorData] = useState(message);
//   const [data, setData] = useState("");

//   useEffect(() => {
//     const targetElement = document.getElementById("target-content");

//     // Helper function to update the target content
//     const updateTargetContent = () => {
//       const sourceElement =
//         document.getElementsByClassName("ck ck-editor__main")[0];
//       if (sourceElement && targetElement) {
//         targetElement.innerHTML = sourceElement.innerHTML;
//       }
//     };

//     // Initial check to wait for the editor to load
//     const checkEditorLoaded = setInterval(() => {
//       const sourceElement =
//         document.getElementsByClassName("ck ck-editor__main")[0];
//       if (sourceElement) {
//         clearInterval(checkEditorLoaded); // Stop checking once loaded
//         updateTargetContent(); // Update with initial content
//       }
//     }, 100); // Check every 100ms

//     // Set up MutationObserver to watch for changes in the editor
//     const observer = new MutationObserver(() => updateTargetContent());

//     // Observe changes if the editor has loaded
//     const editorContainer =
//       document.getElementsByClassName("ck ck-editor__main")[0];
//     if (editorContainer) {
//       observer.observe(editorContainer, { childList: true, subtree: true });
//     }

//     // Clean up intervals and observer on unmount
//     return () => {
//       clearInterval(checkEditorLoaded);
//       observer.disconnect();
//     };
//   }, [editorData]);

//   return (
//     <div>
//       <div className='container'>
//         <div className='row p-4 '>
//           <div className='col-md-6 col-12'>
//             <div className='editor-container-left'>
//               <CKEditor
//                 ref={editorRef}
//                 editor={ClassicEditor}
//                 data={editorData}
//                 onChange={(event, editor) => {
//                   console.log("event", event);
//                   console.log("editor", editor);
//                   const data = editor.getData();
//                   setEditorData(data);
//                 }}
//                 config={{
//                   allowedContent: true,
//                   extraPlugins: [SourceEditing],
//                   toolbar: {
//                     items: [
//                       "undo",
//                       "redo",
//                       "|",
//                       "bold",
//                       "italic",
//                       "SourceEditing",
//                       "Heading",
//                       "|",
//                       "bulletedList", // For bullet points
//                       "numberedList", // For ordered points
//                       "indent", // For indentation
//                     ],
//                   },
//                   plugins: [
//                     ClassicEditor,
//                     Essentials,
//                     Autoformat,
//                     BlockQuote,
//                     Bold,
//                     CloudServices,
//                     Code,
//                     CodeBlock,
//                     Heading,
//                     HorizontalLine,
//                     Image,
//                     ImageToolbar,
//                     ImageUpload,
//                     Base64UploadAdapter,
//                     Italic,
//                     // Link, // To make link visible
//                     List,
//                     Markdown,
//                     Mention,
//                     Paragraph,
//                     SourceEditing,
//                     SpecialCharacters,
//                     SpecialCharactersEssentials,
//                     Strikethrough,
//                     Table,
//                     TableToolbar,
//                     TextTransformation,
//                     TodoList,
//                   ],
//                   // licenseKey: "<YOUR_LICENSE_KEY>",
//                   mention: {
//                     // Mention configuration
//                   },
//                   initialData: editorData,
//                 }}
//               />
//             </div>
//           </div>
//           <div className='col-md-6 col-12'>
//             <div className='editor-container-right shadow' id='target-content'>
//               {/* <div dangerouslySetInnerHTML={{ __html: data }} /> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Editor;

import { useRef, useState, useEffect } from "react";
import "./Editor.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import html2pdf from "html2pdf.js";
import {
  ClassicEditor,
  Essentials,
  Autoformat,
  BlockQuote,
  Bold,
  CloudServices,
  Code,
  CodeBlock,
  Heading,
  HorizontalLine,
  // Image,
  ImageToolbar,
  ImageUpload,
  Base64UploadAdapter,
  Italic,
  Link,
  List,
  Markdown,
  Mention,
  Paragraph,
  SourceEditing,
  SpecialCharacters,
  SpecialCharactersEssentials,
  Strikethrough,
  Table,
  TableToolbar,
  TextTransformation,
  TodoList,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";

const Editor = ({ message }) => {
  const editorRef = useRef(null);
  const [editorData, setEditorData] = useState(message);

  useEffect(() => {
    const targetElement = document.getElementById("target-content");

    const updateTargetContent = () => {
      const sourceElement =
        document.getElementsByClassName("ck ck-editor__main")[0];
      if (sourceElement && targetElement) {
        targetElement.innerHTML = sourceElement.innerHTML;
      }
    };

    const checkEditorLoaded = setInterval(() => {
      const sourceElement =
        document.getElementsByClassName("ck ck-editor__main")[0];
      if (sourceElement) {
        clearInterval(checkEditorLoaded);
        updateTargetContent();
      }
    }, 100);

    const observer = new MutationObserver(() => updateTargetContent());

    const editorContainer =
      document.getElementsByClassName("ck ck-editor__main")[0];
    if (editorContainer) {
      observer.observe(editorContainer, { childList: true, subtree: true });
    }

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
                      "|",
                      "bulletedList",
                      "numberedList",
                    ],
                  },
                  plugins: [
                    ClassicEditor,
                    Essentials,
                    Autoformat,
                    BlockQuote,
                    Bold,
                    CloudServices,
                    Code,
                    CodeBlock,
                    Heading,
                    HorizontalLine,

                    ImageToolbar,
                    ImageUpload,
                    Base64UploadAdapter,
                    Italic,
                    Link,
                    List,
                    Markdown,
                    Mention,
                    Paragraph,
                    SourceEditing,
                    SpecialCharacters,
                    SpecialCharactersEssentials,
                    Strikethrough,
                    Table,
                    TableToolbar,
                    TextTransformation,
                    TodoList,
                  ],
                  initialData: editorData,
                }}
              />
            </div>
          </div>
          <div className='col-md-6 col-12'>
            <div className='editor-container-right  ' id='target-content'>
              {/* Content will update here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
