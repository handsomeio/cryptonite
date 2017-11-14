import React, {Component} from 'react';
import title from './assets/title.png';
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
        const {target} = event;
        const {name, value} = target;

        this.setState({
            [name]: value
        });
    }

    onSubmit = (event) => {
        const {email} = this.state;
        event.preventDefault();

        axios
            .post('http://localhost:4000/subscribe', {email})
            .then(
                response => {
                    console.log(response);
                    this.setState({status: 'Succesfully subscribed'});
                },
                error => console.log(error),
            )
            .catch(
                error => console.log(error),
            );

        this.setState({email: ''});
    }

    render() {
        const {status, email} = this.state;

        return (
            <div className="App">
                    <img src={title} className="title" alt="logo"/>
                    <div className="fields">
                        <div style={{color: 'white', fontSize: '24px'}}>
                            {status}
                        </div>
                        <form onSubmit={this.onSubmit}>
                            <input className="email" type="email" name="email" placeholder="Enter your mail" value={email}
                                   onChange={this.handleChange}/>
                            <button className="action-send" type="submit">Subscribe</button>
                        </form>
                    </div>
            </div>
        );
    }
}

export default App;
