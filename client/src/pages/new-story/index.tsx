import React, { useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { IconButton } from '@material-ui/core';
import ShadowNoneIcon from '@material-ui/icons/ShadowNone';

const RichTextEditor: React.FC = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const handleKeyCommand = (command: string, editorState: EditorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    const toggleInlineStyle = (style: string) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    };

    return (
        <div>
            <div style={{ marginBottom: '10px' }}>
                <IconButton onClick={() => toggleInlineStyle('BOLD')}>
                    <ShadowNoneIcon />
                </IconButton>
            </div>
            <div style={{ border: '1px solid #ddd', padding: '10px', minHeight: '200px' }}>
                <Editor
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    onChange={setEditorState}
                />
            </div>
        </div>
    );
};

export default RichTextEditor;