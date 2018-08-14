import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Autocomplete from 'react-autocomplete';
import logo from './logo.svg';
import TextField from '@material-ui/core/TextField';
import './App.css';


function buildItems(data) {
  const retVal = {};
  const labels = [];
  Object.keys(data).forEach(name => {
    retVal[name] = Object.keys(data[name])
    retVal[name].map(key => ({ key, val: data[name][key] }))
  })
}


class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      inputValue: '',
      selected: '',
    }
  }

  render() {
    const { selected } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        
        <h2 style={{display:"inline-block"}}>Name:</h2>
        <Autocomplete
          items={[
            { id: 'foo', label: 'foo' },
            { id: 'bar', label: 'bar' },
            { id: 'baz', label: 'baz' },
          ]}
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
        <h1>{selected}</h1>
      </div>
    );
  }
}

export default App;
