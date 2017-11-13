import React, {Component} from 'react';
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
        const {target} = event;
        const {name, value} = target;

        this.setState({
            [name]: value
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
        const {firstName, lastName, email} = this.state;

        return (

               <div class="App">

                    <form onSubmit={this.onSubmit}>
                        <div class="fields">
                            <input class="email" id="email" type="email" name="email" placeholder="who@am.i" value={email}
                                   onChange={this.handleChange}/>
                            <button class="action-send" type="submit">Subscribe</button>
                        </div>
                    </form>
               </div>

        );
    }
}

export default App;
