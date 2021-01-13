import { type } from 'jquery';
import React, { Component } from 'react';

export class Articles extends Component {

    constructor(props){
        super(props);
        this.state = { articles: [] };

        if(props.articles == null)
            this.state.articles = [];

        else{
            this.state.articles = props.articles;
        }

        console.log("xd", this.state.articles);
    }

    render() {
        return (
            <div class="row">
              {this.state.articles.map(forecast =>
                <div id="rcorners1" class="col">
                  <p>{forecast.author}</p>
                  <h4><a href="https://localhost:5001/counter">Beautiful css3 buttons with hover effects</a></h4>
                  <span class="cat">{forecast.postDate}</span>
                </div>
              )}
            </div>
        ); 
    }
}