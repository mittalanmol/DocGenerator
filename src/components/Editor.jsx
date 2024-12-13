import { useRef, useState, useEffect } from "react";
import "./Editor.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import html2pdf from "html2pdf.js";
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
  TableToolbar,
  Link, // To make Link
  List, // Bullet and numbered lists
  Code,
  CodeBlock,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import axios from "axios";

import useDrivePicker from "react-google-drive-picker";

// eslint-disable-next-line react/prop-types
const Editor = ({ message }) => {
  const editorRef = useRef(null);
  // Initialize with `message` if provided, or with `localStorage` if no message, otherwise empty string
  const [editorData, setEditorData] = useState(
    message || localStorage.getItem("editorData") || ""
  );
  const [isButtonDisabled, setIsButtonDisabled] = useState("true");
  const [openPicker, authResponse] = useDrivePicker();

  // const exportAsPDF = () => {
  //   const targetContent = document.getElementById("target-content");

  //   if (targetContent) {
  //     setIsButtonDisabled(false);
  //     // Clone the content and remove CKEditor-specific classes
  //     const clonedContent = targetContent.cloneNode(true);
  //     clonedContent.classList.remove("ck", "ck-editor__editable", "ck-focused");

  //     const options = {
  //       margin: [0.4, 0, 1, 0], // top, left, bottom, right
  //       filename: "content.pdf",
  //       image: { type: "jpeg", quality: 1 },
  //       html2canvas: { scale: 1.5 },
  //       jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  //       // pagebreak: { mode: ["css", "legacy"] }, // Support for CSS page breaks
  //       pagebreak: {
  //         mode: ["css", "legacy"], // Adjust for more precise breaks
  //         //before: ".break-before", // Optional: Add class on elements where you want to enforce a break before
  //         // after: ".break-after", // Optional: Add class on elements where you want to enforce a break after
  //       },
  //     };

  //     // Temporarily add the cloned content to the DOM for PDF generation
  //     document.body.appendChild(clonedContent);

  //     html2pdf()
  //       .set(options)
  //       .from(targetContent)
  //       .save()
  //       .then(() => {
  //         // Remove the cloned content after generating the PDF
  //         document.body.removeChild(clonedContent);
  //       });
  //   }
  // };

  //   fetch("https://www.pdf995.com/samples/pdf.pdf")
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       const link = document.createElement("a");
  //       const url = URL.createObjectURL(blob);
  //       link.href = url;
  //       link.download = "test.pdf";
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //       URL.revokeObjectURL(url);
  //     })
  //     .catch((err) => console.error(err));
  // };

  const sendingDataPdf = async () => {
    console.log("Data Sent", editorData);
    try {
      const response = await axios.post(
        "http://192.168.10.53:8000/api/v1/exportPdf",
        {
          markdown: editorData,
        },
        {
          responseType: "blob", // Important: Specify response type as 'blob'
        }
      );

      // Convert the Blob to a URL
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Create a link element to download the PDF
      const link = document.createElement("a");
      link.href = pdfUrl;

      // Optionally, extract the filename from the headers
      const contentDisposition = response.headers["content-disposition"];
      console.log("filename", contentDisposition);
      const filename = contentDisposition
        ? contentDisposition.split("filename=")[1].replace(/"/g, "")
        : "downloaded_file.pdf";

      link.download = filename; // Set the download filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the URL object after download
      URL.revokeObjectURL(pdfUrl);

      console.log("PDF downloaded successfully");
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  const sendingDataDoc = async () => {
    console.log("Data Sent", editorData);
    try {
      const response = await axios.post(
        "http://192.168.10.53:8000/api/v1/exportDocx",
        {
          markdown: editorData,
        },
        {
          responseType: "blob", // Important: Specify response type as 'blob'
        }
      );

      console.log(response);

      // Convert the Blob to a URL
      const docBlob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      const docUrl = URL.createObjectURL(docBlob);

      // Create a link element to download the PDF
      const link = document.createElement("a");
      link.href = docUrl;

      // Optionally, extract the filename from the headers
      const contentDisposition = response.headers["content-disposition"];
      console.log("filename", contentDisposition);
      const filename = contentDisposition
        ? contentDisposition.split("filename=")[1].replace(/"/g, "")
        : "downloaded_file.docx";

      link.download = filename; // Set the download filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the URL object after download
      URL.revokeObjectURL(docUrl);

      console.log("Document downloaded successfully");
    } catch (error) {
      console.error("Error downloading Document:", error);
    }
  };

  // const SCOPES = "https://www.googleapis.com/auth/drive.file";

  // const customViewsArray = [new google.picker.DocsView()]; // custom view
  const handleOpenPicker = () => {
    openPicker({
      clientId: import.meta.env.VITE_CLIENT_ID,
      developerKey: import.meta.env.VITE_API_KEY,
      viewId: "DOCS",
      // token: token, // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
      callbackFunction: (data) => {
        if (data.action === "cancel") {
          console.log("User clicked cancel/close button");
        }
        console.log(data);
      },
    });
  };

  useEffect(() => {
    const targetElement = document.getElementById("target-content");

    const updateTargetContent = () => {
      const sourceElement =
        document.getElementsByClassName("ck ck-editor__main")[0];
      if (sourceElement && targetElement) {
        targetElement.innerHTML = sourceElement.innerHTML;
        setIsButtonDisabled(targetElement.textContent.trim() === "");
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

  // Update localStorage only when "message" is received or changed and "editorData" changes
  useEffect(() => {
    if (message) {
      setEditorData(message);
      localStorage.setItem("editorData", message);
    }
  }, [message]);

  useEffect(() => {
    if (editorData) {
      localStorage.setItem("editorData", editorData);
    }
  }, [editorData]);

  return (
    <div>
      <div className='container mt-5'>
        <div className='row bg-white fixed-top p-3 '>
          <div className='col-md-12 mb-2'>
            <div className='text-end '>
              <button
                onClick={sendingDataPdf}
                className={
                  isButtonDisabled
                    ? "export-btn-disabled me-2"
                    : "export-btn-disabled me-2 "
                }
                disabled
              >
                Export to PDF
              </button>
              <button
                onClick={sendingDataDoc}
                className={
                  isButtonDisabled ? "export-btn-disabled " : "export-btn "
                }
                disabled={isButtonDisabled}
              >
                Export to Doc
              </button>
              <button
                onClick={() => handleOpenPicker()}
                className={
                  isButtonDisabled
                    ? "export-btn-disabled   ms-2"
                    : "export-btn ms-2 "
                }
                disabled={isButtonDisabled}
              >
                Upload to Drive
              </button>
            </div>
          </div>
        </div>
        <div className='row p-4 mt-6'>
          <div className='col-md-6 col-12'>
            <div className='divsHeading'>
              <h3 className='heading'>Editor</h3>
            </div>
            <div className='editor-container-left'>
              <CKEditor
                ref={editorRef}
                editor={ClassicEditor}
                data={message || editorData}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  // Only update if data is different
                  if (data !== editorData) setEditorData(data);
                }}
                config={{
                  allowedContent: true,
                  extraPlugins: [SourceEditing],
                  // autoParagraph: false, // Prevents CKEditor from auto-wrapping in <p> tags.
                  // enterMode: "ENTER_BR", // Ensure newlines are treated as <br>.
                  // forceEnterMode: true, // Use forced enter mode for better formatting.
                  // autoFormat: false, // Disable autoformatting
                  // outputFormat: "html",
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
                      "bulletedList", // For bullet points
                      "numberedList", // For ordered points
                      "|",
                      "insertTable", // Add the insertTable option to toolbar
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
                    TableToolbar,
                    Undo,
                    SourceEditing,
                    Autoformat,
                    Heading,
                    HeadingEditing,
                    Link,
                    List,
                    Code,
                    CodeBlock,
                  ],

                  initialData: editorData,
                  table: {
                    contentToolbar: [
                      "tableColumn",
                      "tableRow",
                      "mergeTableCells",
                    ],
                  },
                }}
                // onReady={(editor) => {
                //   // Add custom behavior for Enter inside table cells
                //   editor.editing.view.document.on("enter", (event, data) => {
                //     const selection = editor.model.document.selection;
                //     const position = selection.getFirstPosition();

                //     if (position.findAncestor("tableCell")) {
                //       data.preventDefault(); // Prevent new line in table cells
                //       // Optionally: You could use `softBreak` instead.
                //       // editor.execute('softBreak');
                //     }
                //   });
                // }}
              />
            </div>
          </div>
          <div className='col-md-6 col-12 '>
            <div className='divsHeading'>
              <h3 className='heading'>Preview</h3>
            </div>
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
