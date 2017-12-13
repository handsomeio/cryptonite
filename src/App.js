import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

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
        const {target} = event;
        const {name, value} = target;

        this.setState({
            [name]: value
        });
    }

    onSubmit = (event) => {
        const {email, firstName, lastName} = this.state;
        event.preventDefault();

        const httpClient = axios.create();
        httpClient.defaults.timeout = 3000;

        httpClient
            .post('http://bitcoach.net:4000/webinar/subscribe', {email, firstName, lastName})
            .then(
                response => {
                    NotificationManager.success('Uspense ste sa prihlasili', 'Webinar');
                    this.setState({email: '', firstName: '', lastName: '', status: 'Succesfully subscribed'});
                },
                error => {
                    NotificationManager.error('Nemate internetove pripojenie/uzivatel je uz zaregistrovany', 'Webinar');
                    this.setState({status: 'This email is already subsribed'});
                },
            )
            .catch(
                error => {
                    NotificationManager.error('Mail je uz zaregistrovany', 'Webinar');
                    this.setState({status: 'This email is already subsribed'});
                }
            );


    }

    render() {
        const {status, email, firstName, lastName} = this.state;

        return (
            <div>
                <header className="header">
                    <img src={require('./assets/logo.svg')} className="logo" alt="bitcoach-logo"/>
                </header>

                <NotificationContainer />

                <div className="banner-wrap">
                    <div className="content-wrap">
                        <div className="title-wrap">
                            <div className="title uppercase">Prihláška na Bitcoach Webinár</div>
                            <div className="text bold">Úvod do sveta kryptomien</div>
                        </div>
                        <form className="form" onSubmit={this.onSubmit}>
                            <div className="group">
                                <input type="text" name="firstName" onChange={this.handleChange} value={firstName}
                                       required/>
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Meno</label>
                            </div>
                            <div className="group">
                                <input type="text" name="lastName" onChange={this.handleChange} value={lastName}
                                       required/>
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Priezvisko</label>
                            </div>
                            <div className="group">
                                <input type="email" name="email" onChange={this.handleChange} value={email} required/>
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Email</label>
                            </div>
                            <button type="submit" className="submit-button"><span
                                className="button-title">Prihlásiť sa</span></button>
                        </form>

                    </div>
                </div>
                <div className="body-wrap">
                    <div className="body-title-wrap">
                        <div className="body-title">Hlavné témy Webinára:</div>
                        <div className="circle-bar-wrap">
                            <ul className="circle-bar">
                                <li>
                <span className="first-circle">
                  <img src={require('./assets/bitcoin.svg')} className="circle-icon" alt="bitcoin-logo"/>
                </span>
                                    <div className="circle-title">Kryptomeny</div>
                                </li>
                                <li>
                <span className="circle">
                  <img src={require('./assets/howto.svg')} className="circle-icon" alt="bitcoin-logo"/>
                </span>
                                    <div className="circle-title">Ako Začať</div>
                                </li>
                                <li>
                <span className="circle">
                  <img src={require('./assets/analytics.svg')} className="circle-icon" alt="bitcoin-logo"/>
                </span>
                                    <div className="circle-title">Výhody a Riziká</div>
                                </li>
                                <li>
                <span className="circle">
                  <img src={require('./assets/comment.svg')} className="circle-icon" alt="bitcoin-logo"/>
                </span>
                                    <div className="circle-title">Diskusia</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="body-text">Webinár sa uskutoční 19.12.2017 o 20:00. Potrebné informácie na
                        prihlásenie dostanete po odoslaní prihlasovacieho formulára na Váš zadaný e-mailový kontakt.
                    </div>
                </div>
                <div className="footer-wrap">
                    <div className="copy-rigth">
                        &#169; 2017 Bitcoach
                    </div>
                    <div className="social-wrap">
                        <a href="https://www.facebook.com/bitc0ach/" target="_blank">
                            <img src={require('./assets/facebook.svg')} className="social-logo" alt="facebook"/>
                        </a>
                        <a href="https://twitter.com/BitC0ach" target="_blank">
                            <img src={require('./assets/twitter.svg')} className="social-logo" alt="twitter"/>
                        </a>
                        <a href="https://t.me/join_bitcoachCHAT" target="_blank">
                            <img src={require('./assets/telegram.svg')} className="social-logo" alt="telegram"/>
                        </a>
                        <a href="mailto:info@bitcoach.net">
                            <img src={require('./assets/mail.svg')} className="social-logo" alt="mail"/>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
