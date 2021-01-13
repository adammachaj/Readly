import { type } from 'jquery';
import EditorJS from '@editorjs/editorjs'; 
import EditorJs from '@editorjs/editorjs'; 
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
import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'
import { EDITOR_JS_TOOLS } from './tools'

export class Edytor extends Component {

  constructor(props) {
    super(props)

    this.editor = new EditorJS({ 
      holderId: 'editorjs',
      readOnly: false,
      tools: {
        header: {
          class: Header,
          inlineToolbar: ['link']
        }
      },
      data: {}
    })

    this.state = {data}
  }

}

export class PostViewer extends Component {


    

    constructor(props) {
        super(props)

        this.article = [];

         this.editor = new EditorJS({ 
            holderId: 'editorjs',
  
            readOnly: false,
  
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
            },
  
            data: this.article
          })

          this.state = { article: this.article, loading: true, "editor": this.editor};
      }
    

      

    async populateWeatherData() {
        const token = await authService.getAccessToken();
        const response = await fetch('post/details/2034', {
          headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        this.setState({ article: JSON.parse(data.content), loading: false});
        
        this.state.editor.data = this.state.article;
        console.log("article: ", (this.state.article));
        console.log("data: ", this.state.editor.data)
    }

    componentDidMount() {
      console.log("log: ", this.state.editor);
      this.populateWeatherData();

      this.editor.data = this.state.article;
      console.log("data2: ", this.state.editor.data)

      this.setState({"editor": this.editor})

      // this.state.editor.render(this.editor);
    }

    render() {
        return (
            <div>
                <h1>PostViewer</h1>
                
                <div id="editorjs"></div>
                {/* <EditorJS />; */}
            </div>
        );

        
    }
}

function reload(){
  var container = document.getElementById("yourDiv");
  var content = container.innerHTML;
  container.innerHTML= content; 

  console.log("Refreshed"); 
}