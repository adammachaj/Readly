import React, { Component } from 'react';

export class SearchTool extends Component {
    
    handleSubmit = (event) => {
        event.preventDefault();

        console.log(document.getElementById("form3Example1").value)
    };

    static renderArticles(articles) {
        return 
    }

    render() {
        return (
            <div>
                <h1>Search Tool</h1>
                <form>
                    <div class="col">
                    <div class="form-outline">
                    <input name="Search" type="text" id="form3Example1" class="form-control" />
                    <label class="form-label" for="form3Example1">First name</label>
                    </div>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block mb-4" onClick={this.handleSubmit}>Sign up</button>
                </form>
            </div>
        );
    }
}
