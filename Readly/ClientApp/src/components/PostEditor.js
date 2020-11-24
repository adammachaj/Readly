import React, { Component } from 'react';
import 'draft-js/dist/Draft.css';
import EditorJs from "../components/editor"

export class PostEditor extends Component {
  render() {
    return (
        <div>
            <h1>Post Editor</h1>
            <div id="editorjs"></div>
            <button class="btn">Save Article</button>
        </div>
    );
  }
}
