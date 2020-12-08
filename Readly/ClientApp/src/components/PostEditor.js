import React, { Component } from 'react';
import 'draft-js/dist/Draft.css';
import EditorJs from '@editorjs/editorjs'; 
import Header from '@editorjs/header'; 
import List from '@editorjs/list'; 
import Image from '@editorjs/image'; 
import Embed from '@editorjs/embed'; 
import Paragraph from '@editorjs/paragraph'; 
import Quote from '@editorjs/quote'; 
import CodeTool from '@editorjs/code';
import Table from '@editorjs/table';
import Underline from '@editorjs/underline';
import { data } from 'jquery';

export class PostEditor extends Component {

  constructor(props) {
    super(props)

    this.editor = new EditorJs({ 
      holderId: 'editorjs',

      tools: {
        header: {
          class: Header,
          inlineToolbar: ['link']
        },

        list: {
          class: List,
          inlineToolbar: ['link']
        },

        underline: {
          class: Underline,
          inlineToolbar: true
        },

        image: {
          class: Image
        },

        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              coub: true
            }
          }
        },

        quote: {
          class: Quote,
          inlineToolbar: true
        },

        code: {
          class: CodeTool,
          inlineToolbar: true
        },

        table: {
          class: Table,
          inlineToolbar: true
        },

        paragraph: {
          class: Paragraph,
          inlineToolbar: true
        },
      }
    })

    this.debug = this.debug.bind(this)
  }

  handleSave = (event) => {

    this.editor.save().then((outputData) => {
      fetch('/createpost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(outputData)
    }).then(r=>r.json).then(d=>console.log(d));

      var content = JSON.stringify(this.outputData)
      console.log('oto content: ' , content)
    }).catch((error) => {
      console.log('Saving failed: ', error)
    });

    event.preventDefault();
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
            <button class="btn" onClick={this.handleSave}>Save Article</button>
        </div>
    );
  }
}
