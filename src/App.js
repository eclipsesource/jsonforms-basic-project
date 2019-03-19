import React, { Component } from 'react';
import ENDPOINT from './vars';
import './App.css';
import schema from './schema.json';
import uischema from './uischema.json';

import * as jsonforms from '@jsonforms/core';
import { JsonForms } from '@jsonforms/react';
import { connect } from 'react-redux';

class App extends Component {

  constructor(){ 
    super();
    this.state = {};
  }

  render() {
    if(Object.keys(this.props.schema).length === 0)
      return null;
    return (
      <div className="App">
        <header className="App-header">
          <p>{this.state.data.info.title}</p>
        </header>
        <div className="form-container">
          <JsonForms/>
          <button onClick={this.handleForm}>SUBMIT</button>
        </div>
      </div>
    );
  }
  
  handleForm = () => {
    const PORT = 3000;
    // Retrieve the endpoint for the request
    const ENDPOINT = Object.keys(this.state.data.paths)[0];
    // Construct the URL of the POST request
    const URL = `${this.state.data.servers[0].url}:${PORT + ENDPOINT}`;
    // POST request
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: this.state.formData
    });
    // Clear the form
    this.props.resetForm();
    // Display the submitted data in the console (for demonstration purposes)
    console.log('form', this.props.formData);
  };
  
  componentDidMount () {
    // Retrieve the OpenAPI definition from the endpoint in JSON
    // Retrieve the schemas
    // Pass the UI Schema and the JSON Schema to create the form controls
    fetch(ENDPOINT)
      .then(response => response.json())
      .then (json => {
        if(json){
          // Update the state to hold the definition data
          this.setState({
            data: json
          });
          this.props.init(schema, uischema);
        }
      });
  }
}  

const mapDispatchToProps = (dispatch) => {
  return {
    init: (schema, uischema) => {
      dispatch(jsonforms.Actions.init({}, schema, uischema));
    },
    resetForm: () => {
      dispatch(jsonforms.Actions.update('', () => ({}) ));
    }
  };
};

const mapStateProps = (state) => {
  return {
    schema: jsonforms.getSchema(state),
    formData: JSON.stringify(jsonforms.getData(state))
  };
}

export default connect(mapStateProps, mapDispatchToProps)(App);
