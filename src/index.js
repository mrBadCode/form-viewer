import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import testData from './testData';



function onSuccess(data) {
  data = preFormData(data);
  data = formData(data, 0);
  ReactDOM.render(<App inputData={data} />, document.getElementById('root'));
}

function preFormData(data) {
  // remove cols 0 & 1
  // join cols 2 & 3
  for (let rowIdx = 0; rowIdx < data.length; rowIdx++) {
    const row = data[rowIdx];
    const newRow = [];
    for (let idx = 0; idx < row.length; idx++) {
      const value = row[idx];
      if(idx < 3) continue;
      if (idx === 3) {
        newRow.push(`${row[idx-1]} ${value}`);
      } else {
        newRow.push(value);
      }
    }
    data[rowIdx] = newRow;
  }
  return data;
}

function formData(data, sortByIdx) {
  // { // sample output
  //   '__allNames': [name1, name2, ...]
  //   '__allKeys': [key1, key2, key3, ...]
  //   'name1': {k1: v1, k2: v2, k3: v3 ...}
  //   'name2': ...
  // }
  const output = {
    '__allNames': [],
    '__allKeys': []
  };
  const idxToKey = {};
  const nameIdx = sortByIdx;
  for (let idx = 0; idx < data[0].length; idx++) {
    if(idx === nameIdx) continue;
    const key = data[0][idx];
    idxToKey[idx] = key;
    output['__allKeys'].push(key)
  }

  for (let rowIdx = 1; rowIdx < data.length; rowIdx++) {
    const row = data[rowIdx];
    const name = data[rowIdx][nameIdx];
    output['__allNames'].push(name);
    output[name] = {};
    for (let idx = 0; idx < row.length; idx++) {
      if(idx === nameIdx) continue;
      const key = idxToKey[idx];
      const value = row[idx];
      output[name][key] = value;
    }
  }

  return output;
}
if (!window.google) {
  onSuccess(testData);
} else {
  window.google.script.run.withSuccessHandler(onSuccess)
  .getAllData();
}