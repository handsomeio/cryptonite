import React, {Component} from 'react';
import title from './assets/title.png';
import logo from './assets/logo.svg';

import './App.css';
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            status: 'Subscribe',
            success: false,
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
        event.preventDefault();

        if (!this.state.success) {
            const {email} = this.state;

            axios
                .post('http://bitcoach.net:4000/subscribe', {email})
                .then(
                    response => {
                        this.setState({status: 'Subscribed!', success: true});
                    },

                    error => console.log(error),
                )
                .catch(
                    error => console.log(error),
                );

        }
    }


    render() {
        const {status, email} = this.state;

        return (
            <div className="App">
                    <img src={logo} className="title"/>
                    <div className="fields">
                        <form onSubmit={this.onSubmit}>
                            <div className="wrapper">
                                <input className="email" type="email" name="email" placeholder="Enter your e-mail"
                                       value={email}
                                       onChange={this.handleChange}/>
                                <button className={this.state.success ? "success action-send" : "action-send"}
                                        type="submit">{status}</button>
                            </div>
                        </form>
                </div>
                <div className="bg">
                </div>
            </div>
        );
    }
}

export default App;
