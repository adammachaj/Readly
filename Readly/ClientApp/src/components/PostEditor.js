import React, { Component } from 'react';
import 'draft-js/dist/Draft.css';
import EditorJs from 'react-editor-js';

export class PostEditor extends Component {
  render() {
    return (
        <div>
            <h1>Post Editor</h1>
            <EditorJs/>
        </div>
        

    );
  }
}
