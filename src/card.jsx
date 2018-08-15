import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import './card.css';

class KeyValueCard extends Component {
  render() {
    const { title, content } = this.props;
    return (
      <Paper elevation={2} style={{width: '40%'}}>

        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography variant="title" color="inherit">
            {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <div className='kvcard-content'>{content}</div>
      </Paper>
    );
  }
}

export default KeyValueCard;
