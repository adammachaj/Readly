import React, { Component } from 'react';
import 'draft-js/dist/Draft.css';
import EditorJs from '@editorjs/editorjs'; 

export class PostEditor extends Component {

  constructor(props) {
    super(props)

    this.editor = new EditorJs({ 
      holder: 'editorjs'
    })

    this.debug = this.debug.bind(this)
  }

  debug() {
    // let saveBtn = document.getElementsByClassName('btn');
    // console.log("asd");
    // console.log(saveBtn);
    this.editor.save().then((outputData) => {
      console.log('Article data: ', outputData)
    }).catch((error) => {
      console.log('Saving failed: ', error)
    });
  }

  render() {
    return (
        <div>
            <h1>Post Editor</h1>
            <div id="editorjs"></div>
            <button class="btn" onClick={this.debug}>Save Article</button>
        </div>
    );
  }
}
