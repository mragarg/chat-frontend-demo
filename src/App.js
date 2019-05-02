import React from 'react';
import axios from 'axios';

import ChatList from './ChatList';
import ChatForm from './ChatForm';
import qs from 'qs';

class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       messages: [],
       text: ''
    }
  }
  

  componentDidMount() {
    setInterval( async () => {
      const {data} = await axios.get('/api')
      // console.log(data);
      this.setState({
        messages: data
      });
    }, 2000);

  }

  render() {
    return (
      <div className="App">
        <h1> Chat App </h1>
        <ChatList messages={this.state.messages}/>
        <ChatForm text={this.state.text} handleChange={this._setText} handleSend={this._sendMessage}/>
      </div>
    );
  }

  _setText = (text) => {
    console.log("setText");
    this.setState({
      text
    });
  }

  _sendMessage = () => {
    axios({
      method: 'post',
      url: '/api',
      data: qs.stringify({
        message: this.state.text
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    console.log("sendMessage");
  }

}

export default App;
