import React, { Component } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

import './App.css';

class App extends Component {
  state = {
    entityid: 0,
    sku: '',
    description: '',
    logo: ''
  }

  handleChange = ({ target: { value, name }}) => this.setState({ [name]: value })

  createAndDownloadPdf = () => {
    axios.post('/create-pdf', this.state)
      .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'newPdf.pdf');
      })
  }

  render() {

    return (
      <div className="App">
    
        <input type="text" placeholder="EntityId" name="entityid" onChange={this.handleChange}/>
        <input type="number" placeholder="Product SKU" name="sku" onChange={this.handleChange} />
        <input type="number" placeholder="Company Description" name="description" onChange={this.handleChange} />
        <input type="number" placeholder="Logo" name="logo" onChange={this.handleChange} />
        <button onClick={this.createAndDownloadPdf}>Download PDF</button>
      </div>
    );
  }

}
  export default App;
