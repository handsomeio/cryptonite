import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      status: '',
    };
  }

  handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;

    this.setState({
      [name] : value
    });
  }

  onSubmit = (event) => {
    const { email } = this.state;
    event.preventDefault();

    axios
      .post('http://localhost:4000/subscribe', {email})
      .then(
        response => this.setState({ status: 'Succesfully subscribed' }),
        error => this.setState({ status: 'This email is already subsribed' }),
      )
      .catch(
        error => this.setState({ status: 'This email is already subsribed' }),
      );

    this.setState({ email: '' });
  }

  render() {
    const { status, email } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div style={{color: 'red'}}>
          {status}
        </div>
        <div>
          <form onSubmit={this.onSubmit}>
            <label>
              Email
              <input type="email" name="email" value={email} onChange={this.handleChange} />
            </label>
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
