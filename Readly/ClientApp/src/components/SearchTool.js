import { type } from 'jquery';
import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'

export class SearchTool extends Component {

  constructor(props) {
    super(props);
    this.state = {loading: true, articles: [], lol: [], forecasts: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state.articles = [];
    this.link = "https://localhost:5001/viewer/";
  }

  async populateArticleData() {
    const token = await authService.getAccessToken();
    const response = await fetch('https://localhost:5001/posts', {
      headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    this.setState({ articles: data, loading: false, forecasts: data });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(document.getElementById("form3Example1").value);

    this.populateArticleData();
  };

  article = props => 
      <div class="row">
        {props.articles.map(article =>
          <div id="rcorners1" class="col">
            <p>{article.author}</p>
            {this.link = "https://localhost:5001/viewer/" + article.id}
            <h4><a href={this.link}>Beautiful css3 buttons with hover effects</a></h4>
            <span class="cat">{article.postDate}</span>
          </div>
        )}
      </div>
  
  render() {
    return (
      <div>
        <h1 id="tabelLabel" >Weather forecast</h1>
        <h1>Search Tool</h1>
        <form>
          <div class="col">
            <div class="form-outline">
              <input name="Search" type="text" id="form3Example1" class="form-control" />
              </div>
            </div>
          <button type="submit" class="btn btn-primary btn-block mb-4" onClick={this.handleSubmit}>Search</button>
        </form>
        <div class="row">
          {this.state.articles.map(article =>
            <div id="rcorners1" class="col">
              <p>{article.author}</p>
              <h4><a href={this.link += article.id}>Beautiful css3 buttons with hover effects</a></h4>
              <span class="cat">{article.postDate}</span>
            </div>
          )}
        </div>
      </div>
    );
  }
}
