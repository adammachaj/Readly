import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'

export class SearchTool extends Component {
    

  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true };
  }

  componentDidMount() {
    this.populateWeatherData();
  }

    handleSubmit = (event) => {
        event.preventDefault();

        console.log(document.getElementById("form3Example1").value)
    };

  static renderArticles(articles) {
    return (
      <div class="row">
        {articles.map(forecast =>
          <div id="rcorners1" class="col">
            <p>{forecast.author}</p>
            <h4><a href="https://localhost:5001/counter">Beautiful css3 buttons with hover effects</a></h4>
            <span class="cat">{forecast.postDate}</span>
          </div>
        )}
      </div>
    ); 
  }

  render() {
    let contents = this.state.loading
    ? <p><em>Loading...</em></p>
    : SearchTool.renderArticles(this.state.forecasts);

    return (
      <div>
      <h1 id="tabelLabel" >Weather forecast</h1>
        <h1>Search Tool</h1>
        <form>
          <div class="col">
            <div class="form-outline">
              <input name="Search" type="text" id="form3Example1" class="form-control" />
              {/* <label class="form-label" for="form3Example1">First name</label> */}
              </div>
            </div>
          <button type="submit" class="btn btn-primary btn-block mb-4" onClick={this.handleSubmit}>Sign up</button>
        </form>
        {contents}
      </div>
    );
  }

  async populateWeatherData() {
    const token = await authService.getAccessToken();
    const response = await fetch('/posts', {
      headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    this.setState({ forecasts: data, loading: false });
  }
}
