import { type } from 'jquery';
import EditorJs from 'react-editor-js';
import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'
import { EDITOR_JS_TOOLS } from './tools'

export class PostViewer extends Component {
    
  constructor(props) {
    super(props)

    this.state = {blocks: {}}
  }

  async populateWeatherData() {
      const token = await authService.getAccessToken();
      const response = await fetch('post/content/2034', {
        headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      this.setState({ blocks: JSON.parse(data)});

      console.log(this.state.blocks);
    }

    componentDidMount() {
      this.populateWeatherData();
    }

    render() {
      return (
        <div>
          <h1>PostViewer</h1>
          <EditorJs readOnly enableReInitialize data={this.state.blocks} tools={EDITOR_JS_TOOLS}/>
        </div>
      );
    }
}
