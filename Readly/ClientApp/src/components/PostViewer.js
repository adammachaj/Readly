import React, { Component } from 'react';
import EditorJs from '@editorjs/editorjs'; 

export class PostViewer extends Component {
    constructor(props) {
        super(props)
      }

    state = {
        tekst : {},
        person: {}
    };

    async componentDidMount() {
       var url = window.location.pathname
       console.log("url: ", url);
        // const response = await fetch('/post/details/{id}');
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ person: data});
        console.log(typeof(JSON.parse(this.state.person.content)));

        this.editor = new EditorJs({ 
          holder: 'editorjs',
          readOnly: true,
          data: JSON.parse(this.state.person.content)});
    }

    render() {
        return (
            <div>
                <div>{this.state.person.content}</div>
                <h1>post: </h1>
                <div id="editorjs"></div>
            </div>
        );
    }
}
