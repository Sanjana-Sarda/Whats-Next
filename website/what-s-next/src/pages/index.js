import * as React from 'react'
import Layout from '../components/layout'
import EnterMenu from '../components/entermenu'
import SearchMenu from '../components/searchmenu'
import OptionsMenu from '../components/optionsmenu'
import MovieSelect from '../components/movie-select'
import Button from '@material-ui/core/Button';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://lvh.me:4001";

const { Component } = React;

var ppl = [{name: 'a'},{name: 'b'},{name: 'c'}]

const socket = socketIOClient(ENDPOINT);

class IndexPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            friend: '',
            people: ppl,
            response: ''
        }

    }
    
    useEffect = (e) => {
        e.preventDefault();
        socket.on("FromAPI", data => {
            this.setState({response: data});
        });
    }
    endEffect = (e) => {
        e.preventDefault();
        socket.disconnect();
    }

    getUsername = (val) => {
        this.setState({ username: val.target.value });
    }

    submitUsername = (e) => {
        alert('A name was submitted: '+this.state.username);
        e.preventDefault(); 
    }

    getFriend = (val) => {
        this.setState({ friend: val.target.value});
    }
    submitFriend = (e) => {
        //alert('A friend was submitted: '+this.state.friend);
        e.preventDefault();
        console.log('Trying to set friend') 
        console.log(this.state.friend)
    }

 

    render() {
        console.log("Index called")
        console.log(this.state.people)
        return (
            <div>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <Button onClick={this.useEffect}>StartSocketTest</Button>
                <p>It's <time dateTime={this.state.response}>{this.state.response}</time></p>
                <Button onClick={this.endEffect}>EndSocketTest</Button>
                <Layout pageTitle="What's Next?">
                    <p>ECE 188: Final Project - Minimum Viable Product</p>
                    <div>
                        <EnterMenu value={this.state.username} onChangeValue={this.getUsername} onSubmit={this.submitUsername} />
                    </div>
                    <br/>
                    <br/>
                    <div>
                        <SearchMenu value={this.state.friend} people={this.state.people} onChange={this.getFriend} submitFriend={this.submitFriend}/>
                    </div>
                    <br/>
                    <br/>
                    <div>
                        <OptionsMenu />
                    </div>
                    <br/>
                    <br/>
                    <div>
                        <MovieSelect movieTitle="Test Movie"/>
                    </div>
                </Layout>
            </div>
            
        );
    }
};

export default IndexPage;