import React from "react";
import { Editor } from "react-draft-wysiwyg";

import { EditorState, convertToRaw } from "draft-js";
import CloseIcon from "@mui/icons-material/Close";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Dialog } from "@mui/material";

import styles from "./textEditor.module.scss";
import { convertFromRaw } from "draft-js";

export default function TextEditor({ text, value, setValue }) {
  const [editorState, setEditorState] = React.useState(
    value
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(value)))
      : EditorState.createEmpty()
  );
  const [showModal, setShowModal] = React.useState(false);

  const setDataChange = (e) => {
    const contentState = convertToRaw(e.getCurrentContent());

    setValue(JSON.stringify(contentState));
    setEditorState(e);
  };
  return (
    <div>
      <span className={styles.button} onClick={() => setShowModal(true)}>
        {text}
      </span>

      <Dialog fullScreen open={showModal} onClose={() => setShowModal(false)}>
        <div className={styles.titleText}>
          <span>Tratamiento</span>
          <CloseIcon onClick={() => setShowModal(false)} />
        </div>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName={styles.dialogContainer}
          editorClassName={styles.textContainer}
          onEditorStateChange={setDataChange}
        />
      </Dialog>
    </div>
  );
}
