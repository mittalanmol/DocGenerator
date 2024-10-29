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
// eslint-disable-next-line react/prop-types
const Editor = ({ message }) => {
  const editorRef = useRef(null);
  const [editorData, setEditorData] = useState(message);
  // const [data, setData] = useState("");

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
      <div className='container mt-5'>
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
