import React, { Component } from 'react';
import QuestionTitle from './QuestionTitle';
import qs from 'qs';
import axios from 'axios';

class Question extends Component {
    state = {
        text: "",
        expanded: false,
        editing: false,
        children: []
    }

    componentDidMount(){
        this.getData(this.getChildren);
    }

    getData = (callback) => {
        var apiURL = this.props.id ? '/api/questions/' + this.props.id : '/api/questions/start';
        return axios.get(apiURL)
            .then(res => {
                if(res.data){
                    this.setState({
                        text: res.data.question,
                        id: res.data._id,
                    });
                    callback();
                }
            })
            .catch(err => console.log(err));
    }

    getChildren = () => {
        axios.get('/api/questions/' + this.state.id +'/children')
            .then(res => {
                if(res.data){
                    this.setState({
                        children: res.data,
                    });
                }
            })
            .catch(err => console.log(err));
    }

    displayChildren = () => {
        let opts = []
        for(let i = 0; i < this.state.children.length; i++) {
            opts.push(<QuestionTitle id={this.state.children[i]._id} key={i}/>);
        }
        return opts;
    }

    expandOptions = () => {
        this.setState({expanded: true});
    }

    minOptions = () => {
        this.setState({expanded: false});
    }

    toggleEdit = () => {
        this.setState({editing: ! this.state.editing});
    }

    saveInfo = () => {
        this.toggleEdit();
        const updateObj = {question: this.state.text};
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        axios.post('/api/questions/' + this.state.id, qs.stringify(updateObj), config)
            .then(res => {
                if(res.data){
                    this.getData(this.getChildren);
                }
            })
            .catch(err => console.log(err));
        console.log(this.state.text); // TODO: add server save code
    }

    textRepresentation = () => {
        if(this.state.editing) {
            return (
                <div className="input-group pb-3">
                    <textarea id={this.state.id + "-textarea"} className="form-control" value={this.state.text} onChange={this.handleChange}></textarea>
                </div>
            )
        } else {
            return (
                <p><b>Text: </b>{ this.state.text } </p>
            )
        }
    }

    handleChange = (event) => {
        this.setState({text: event.target.value});
    }

    editBtn = () => {
        if(!this.state.editing) {
            return (
                <a className="anchor text-info" onClick={this.toggleEdit}>edit</a>
            )
        } else {
            return (
                <a className="anchor text-info" onClick={this.saveInfo}>save</a>
            )
        }
    }

    expandBtn = () => {
        if(this.state.children && this.state.children.length > 0) {
            if(this.state.expanded) {
                return (
                    <div className="col-md-12">
                        <button className="btn btn-info" onClick={this.minOptions}>minimize options</button>
                        <hr/>
                        <h6>Options: </h6>
                        { this.displayChildren() }
                    </div>
                )
            } else {
                return (
                    <div className="col-md-12">
                        <button className="btn btn-info" onClick={this.expandOptions}>expand options</button>
                    </div>
                )
            }
        } else {
            return (
                <span></span>
            )
        }
    }
  
    render() {
        let text = this.textRepresentation();
        let editBtn = this.editBtn();
        let expandBtn = this.expandBtn();
        
        if(this.state.expanded) {
            return (
                <div className="row">
                    <div className="col-md-10">
                        {text}
                    </div>
                    <div className="col-md-2">
                        {editBtn}
                    </div>
                    { expandBtn }
                </div>
            )
        } else {
            return (
                <div className="row">
                    <div className="col-md-10">
                        {text}
                    </div>
                    <div className="col-md-2">
                        {editBtn}
                    </div>
                    { expandBtn }
                </div>
            )
        }
    }
  }
  
  export default Question