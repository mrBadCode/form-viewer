import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Autocomplete from 'react-autocomplete';
import logo from './logo.svg';
import TextField from '@material-ui/core/TextField';
import KeyValueCard from './card';
import './App.css';


  // { // sample output
  //   '__allNames': [name1, name2, ...]
  //   '__allKeys': [key1, key2, key3, ...]
  //   'name1': {k1: v1, k2: v2, k3: v3 ...}
  //   'name2': ...
  // }

function buildLabels(data) {
  const labels = []
  data['__allNames'].forEach(name => {
    labels.push({ id: name, label: name });
  });
  return labels;
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      inputValue: '',
      selected: null,
    }
    this.labels = buildLabels(props.inputData);
    console.log(props.inputData);
    
  }

  buildSelectedCards() {
    const allKeys = this.props.inputData['__allKeys']
    const { selected } = this.state;
    if(selected === null) return '';
    const keyValues = this.props.inputData[selected];
    console.log(selected);
    console.log(keyValues);
    return allKeys.map(key => (
      <KeyValueCard key={key} title={key} content={keyValues[key]} />
    ));
  }

  render() {
    const { selected } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src="https://avatars2.githubusercontent.com/u/2138704?s=400&v=4" className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className='sticky-title'>
        <h2 style={{display:"inline-block"}}>Name:</h2>
        <Autocomplete
          items={this.labels}
          shouldItemRender={(item, inputValue) => item.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1}
          getItemValue={item => item.label}
          renderItem={(item, highlighted) =>
            <div
              key={item.id}
              style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
            >
              {item.label}
            </div>
          }
          renderInput={props => {
            return <TextField
            id="name"
            label=""
            value={this.state.name}
            margin="normal"
            inputProps={{
              style:{
                textAlign: "center",
                fontSize: "22px"
              },
              ...props
            }}
          />
          }}
          value={this.state.inputValue}
          onChange={e => this.setState({ inputValue: e.target.value })}
          onSelect={inputValue => this.setState({ inputValue, selected: inputValue })}
        />
        </div>
        <div>
          {this.buildSelectedCards()}
        </div>

      </div>
    );
  }
}

export default App;
