import React, { Component } from 'react';
import Question from './Question';
import axios from 'axios';

class QuestionTitle extends Component {
    state = {
        title: "",
        expanded: false
    }

    componentDidMount(){
        this.getData();
    }

    getData = () => {
        var apiURL = '/api/questions/' + this.props.id;
        return axios.get(apiURL)
            .then(res => {
                if(res.data){
                    this.setState({
                        title: res.data.option
                    });
                }
            })
            .catch(err => console.log(err));
    }

    expandOptions = () => {
        this.setState({expanded: true});
    }

    minOptions = () => {
        this.setState({expanded: false});
    }
  

    render() {
        if(!this.state.expanded) {
            return (
                <div className="container pt-3 pr-0">
                    <div className="row">
                        <div className="col-md-10 border-left">
                            <p><b></b>{ this.state.title } </p>
                        </div>
                        <div className="col-md-2">
                            <a onClick={this.expandOptions} className="anchor text-info">expand</a>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container pt-3 pr-0">
                    <div className="row border-left">
                        <div className="col-md-10">
                            <p><b></b>{ this.state.title } </p>
                        </div>
                        <div className="col-md-2">
                            <a onClick={this.minOptions} className="anchor text-info">minimize</a>
                        </div>
                        <div class="container">
                            <Question id={this.props.id}/>
                        </div>
                    </div>
                </div>
            )
        }
    }
  }
  
  export default QuestionTitle