import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      firstName: '',
      lastName: '',
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
    const { firstName, lastName, email } = this.state;
    event.preventDefault();

    axios.post('http://localhost:4000/subscribe', {
        firstName,
        lastName,
        email,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    this.setState({
      firstName: '',
      lastName: '',
      email: '',
    });
  }

  render() {
    const { firstName, lastName, email } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <form onSubmit={this.onSubmit}>
            <label>
              First Name
              <input type="text" name="firstName" value={firstName} onChange={this.handleChange}/>
            </label>
            <label>
              Last Name
              <input type="text" name="lastName" value={lastName} onChange={this.handleChange} />
            </label>
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
