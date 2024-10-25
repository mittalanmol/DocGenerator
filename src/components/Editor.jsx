import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./Editor.css";

const Editor = () => {
  const [editorData, setEditorData] = useState(
    "Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think and learn like humans. This technology encompasses a wide range of capabilities, including problem-solving, speech recognition, decision-making, and language translation. AI's importance in modern technology cannot be overstated; it enhances automation, improves efficiency, and drives innovation across various sectors."
  );
  return (
    <div>
      <div className="container">
        <div className="row p-4 ">
          <div className="col-md-6 col-12">
            <div className="editor-container-left">
              <CKEditor
                editor={ClassicEditor}
                data={editorData}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setEditorData(data);
                }}
              />
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="editor-container-right shadow">
              <div dangerouslySetInnerHTML={{ __html: editorData }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
