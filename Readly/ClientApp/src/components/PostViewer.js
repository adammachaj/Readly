import { type } from 'jquery';
import EditorJs from 'react-editor-js';
import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'
import { EDITOR_JS_TOOLS } from './tools'

export class PostViewer extends Component {
    
  constructor(props) {
    super(props)
    this.state = {blocks: {}, href : ('post/content/').concat((window.location.href).slice(30, (window.location.href).length)), isAuthenticated: false, userName: null}
  }

  async populateWeatherData() {
      const token = await authService.getAccessToken();
      const response = await fetch(this.state.href, {
        headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      this.setState({ blocks: JSON.parse(data)});
    }

  async populateState() {
      const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
      this.setState({
          isAuthenticated,
          userName: user && user.name
      });
  }

    componentDidMount() {
      this.populateWeatherData();

      this.populateState();
      this._subscription = authService.subscribe(() => this.populateState());
    }

    render() {
      const { isAuthenticated, userName } = this.state
      return (
        <div>
          <h1>PostViewer</h1>
          {userName}
          <EditorJs readOnly enableReInitialize data={this.state.blocks} tools={EDITOR_JS_TOOLS}/>
        </div>
      );
    }
}
