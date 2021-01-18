import React, { Component } from 'react';
// import 'draft-js/dist/Draft.css';
import EditorJS from '@editorjs/editorjs'; 
import Header from '@editorjs/header'; 
import List from '@editorjs/list'; 
import ImageTool from '@editorjs/image'; 
import SimpleImage from '@editorjs/simple-image'; 
import Embed from '@editorjs/embed'; 
import Paragraph from '@editorjs/paragraph'; 
import Quote from '@editorjs/quote'; 
import CodeTool from '@editorjs/code';
import Table from '@editorjs/table';
import Underline from '@editorjs/underline';
import { data } from 'jquery';
import authService from './api-authorization/AuthorizeService'

export class PostEditor extends Component {

  constructor(props) {
    super(props)

    this.state = {isAuthenticated: false, userName: null}

    this.editor = new EditorJS({ 
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

        // image: {
        //   class: Image
        // },

        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
              byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
            }
          }
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
        }
      }
    })
  }

  componentDidMount() {
    this.populateState();
    this._subscription = authService.subscribe(() => this.populateState());
  }

  async populateState() {
    const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
    this.setState({
        isAuthenticated,
        userName: user && user.name
    });
}

  handleSave = (event) => {
    const { isAuthenticated, userName } = this.state
    var article = { headline: "test", content: {}, author: userName}

    this.editor.save().then((outputData) => {

      console.log("title: ", document.getElementById("title").value)
      console.log("author: ", userName)
      article.content = outputData
      article.headline = document.getElementById("title").value

      fetch("/createpost",{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(article)
      })

    }).catch((error) => {
      console.log('Saving failed: ', error)
    });

    event.preventDefault();
  }

  render() {
    return (
      <div class="editor-background">
            <form class="form-rounded">
              <div>
                <div class="input-group input-group-lg">
                  <span class="input-group-text" id="inputGroup-sizing-lg">Title</span>
                  <input name="Search" type="text" id="title" class="form-control" aria-describedby="inputGroup-sizing-lg" />
                </div>
              </div>
            </form>
            <div id="editorjs"></div>
            <button class="btn btn-outline-warning" onClick={this.handleSave}>Save Article</button>
      </div>
    );
  }
}
