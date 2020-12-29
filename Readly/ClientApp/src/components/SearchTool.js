import React, { Component } from 'react';

export class SearchTool extends Component {
    
    handleSubmit = (event) => {
        event.preventDefault();

        console.log(document.getElementById("form3Example1").value)

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

                <form>
    <div class="col">
      <div class="form-outline">
        <input name="Search" type="text" id="form3Example1" class="form-control" />
        <label class="form-label" for="form3Example1">First name</label>
      </div>
    </div>

  <button type="submit" class="btn btn-primary btn-block mb-4" onClick={this.handleSubmit}>Sign up</button>
</form>

                {/* <div id="editorjs"></div> */}

                {/* <form action="/search" onSubmit={this.handleSubmit}>
                    <input id="bar" type="text" name="q" />
                    <button class="btn" onClick={this.handleSubmit}>Search</button>
                </form> */}
            </div>
        );
    }
}
