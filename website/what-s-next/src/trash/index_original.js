import * as React from 'react'
import Layout from '../components/layout'
import EnterMenu from '../components/entermenu'
import SearchMenu from '../components/searchmenu'
import OptionsMenu from '../components/optionsmenu'
import MovieSelect from '../components/movie-select'
import Button from '@material-ui/core/Button';
import axios from 'axios';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://lvh.me:4001";

const { Component } = React;

const socket = socketIOClient(ENDPOINT);
var room = "abc123";
socket.on('connect', function() {
    // Connected, let's sign-up for to receive messages for this room
    socket.emit('room', room);
    console.log("Connecting room....")
});


class IndexPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            friend: '',
            people: [],
            response: '',
            options: [[],[]],
            movies: []
        }

    }
    
    makeRequest () {
        // PUT request using axios with async/await
        /* console.log(this.state.options);
        const options = { nservices: this.state.options[0], ngenres: this.state.options[1]};
        axios.post('https://whats-next-188.herokuapp.com/ini', options)
        .then(response => this.setState({ movies: response.data.id })); */
    }

    getUsername = (val) => {
        this.setState({ username: val.target.value });
    }
    
    addOtherUsers = (val) => {
        if (val !== this.state.username){
            if(this.state.people.indexOf(val) == -1)
                this.setState({people: this.state.people.concat({name: val})});
        } 
    }

    submitUsername = (e) => {
        console.log('Username submitted');
        console.log(this.state.username);
        socket.emit('send-nickname', this.state.username);
        console.log("Connecting send nickname...")
        socket.on('connect', function() {
            // Connected, let's sign-up for to receive messages for this room
            
        });
        socket.on("New User Joined", function(user) {
            // Connected, let's sign-up for to receive messages for this room
            this.addOtherUsers(user)
            console.log("New User Joined ")
            console.log(this.state.people)
        }.bind(this));
        
        this.setState({ username: this.state.username });
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
                        <OptionsMenu value={this.state.options} onChange={this.makeRequest} />
                    </div>
                    <br/>
                    <br/>
                    <div>
                        
                    </div>
                </Layout>
            </div>
            
        );
    }
};

export default IndexPage;