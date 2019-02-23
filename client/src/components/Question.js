import React, { Component } from 'react';
import axios from 'axios';

class Question extends Component {
    state = {
        text: ""
    }

    componentDidMount(){
        this.getData();
    }

    getData = () => {
        var apiURL = this.props.id ? '/api/questions/' + this.props.id : '/api/questions/start';
        return axios.get(apiURL)
            .then(res => {
                if(res.data){
                    this.setState({
                        text: res.data.question
                    });
                }
            })
            .catch(err => console.log(err));
    }
  
    render() {
      return (
        <div>
          <p>{ this.state.text } </p>
          <button>expand options</button>
        </div>
      )
    }
  }
  
  export default Question