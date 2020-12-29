import React, { Component } from 'react';

export class SearchTool extends Component {
    
    handleSubmit = (event) => {
        event.preventDefault();

        console.log()

        // const output = document.createElement('div');
        // const data = [...event.target.elements].reduce((data, element) => {
        //   if (element.name && element.value) {
        //     data[element.name] = element.value;
        //   }
        //   return data;
        // }, {});
        // output.textContent = JSON.stringify(data);
        // document.body.appendChild(output);
    };

    render() {
        return (
            <div>
                <h1>Search Tool</h1>
                {/* <div id="editorjs"></div> */}

                <form action="/search" onSubmit={this.handleSubmit}>
                    <input type="text" name="q" />
                    <button class="btn" onClick={this.handleSubmit}>Search</button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<SearchForm />, document.getElementById('app'));
  