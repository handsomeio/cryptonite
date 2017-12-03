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
    const { email, firstName, lastName } = this.state;
    event.preventDefault();

    axios
      .post('http://localhost:4000/webinar/subscribe', {email, firstName, lastName})
      .then(
        response => this.setState({ status: 'Succesfully subscribed' }),
        error => this.setState({ status: 'This email is already subsribed' }),
      )
      .catch(
        error => this.setState({ status: 'This email is already subsribed' }),
      );

    this.setState({ email: '', firstName: '', lastName: '' });
  }

  render() {
    const { status, email, firstName, lastName } = this.state;

    return (
      <div>
        <header className="header">
          <img src={require('./assets/logo.svg')} className="logo" alt="bitcoach-logo" />
        </header>

        <div className="banner-wrap">
          <div className="content-wrap">
            <div className="title-wrap">
              <div className="title">Webinar Lorem Ipsum</div>
              <div className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            </div>
            <form className="form" onSubmit={this.onSubmit}>
              <div className="group">
                <input type="text" name="firstName" onChange={this.handleChange} value={firstName} required />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Meno</label>
              </div>
              <div className="group">
                <input type="text" name="lastName" onChange={this.handleChange} value={lastName} required />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Priezvisko</label>
              </div>
              <div className="group">
                <input type="email" name="email" onChange={this.handleChange} value={email} required />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Email</label>
              </div>
              <button type="submit" className="submit-button"><span className="button-title">Prihlasit sa</span></button>
            </form>
          </div>
        </div>
        <div className="body-wrap">
          <div className="body-title-wrap">
            <div className="body-title">Webinar Lorem Ipsum</div>
            <div className="body-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
          <div className="circle-bar-wrap">
            <ul className="circle-bar">
              <li>
                <span className="first-circle">
                  <img src={require('./assets/bitcoin.svg')} className="circle-icon" alt="bitcoin-logo" />
                </span>
                <div className="circle-title">Kryptomeny</div>
              </li>
              <li>
                <span className="circle">
                  <img src={require('./assets/howto.svg')} className="circle-icon" alt="bitcoin-logo" />
                </span>
                <div className="circle-title">Ako Zacat</div>
              </li>
              <li>
                <span className="circle">
                  <img src={require('./assets/analytics.svg')} className="circle-icon" alt="bitcoin-logo" />
                </span>
                <div className="circle-title">Vyhody a Rizika</div>
              </li>
              <li>
                <span className="circle">
                  <img src={require('./assets/comment.svg')} className="circle-icon" alt="bitcoin-logo" />
                </span>
                <div className="circle-title">Diskusia</div>
              </li>
            </ul>
          </div>
          </div>
        </div>
        <div className="footer-wrap">
          <div className="copy-rigth">
            &#169; 2017 Bitcoach
          </div>
          <div className="social-wrap">
            <a href="#" className="social-link">
              <img src={require('./assets/facebook.svg')} className="social-logo" alt="facebook" />
            </a>
            <a href="#">
              <img src={require('./assets/twitter.svg')} className="social-logo" alt="twitter" />
            </a>
            <a href="#">
              <img src={require('./assets/telegram.svg')} className="social-logo" alt="telegram" />
            </a>
            <a href="#">
              <img src={require('./assets/mail.svg')} className="social-logo" alt="mail" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
