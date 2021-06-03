import * as React from 'react'
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid'
import * as homeStyles from "/src/components/mainapp.module.css"
import MainStepper from '/src/components/main_stepper'
import Button from '@material-ui/core/Button';
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
/*

makeRequest () {
    // PUT request using axios with async/await
    console.log(this.state.options);
    const options = { nservices: this.state.options[0], ngenres: this.state.options[1]};
    axios.post('https://whats-next-188.herokuapp.com/ini', options)
    .then(response => this.setState({ movies: response.data.id })); 
}

*/

const testing_ppl = [{name: "Bob"},{name: "Ginger"},{name: "Shitshow"},{name: "Hollow"}]

class MainApp extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            friend: '',
            people: [],
            response: '',
            nservices: [], 
            ngenres: [],

            picked_services: [], 
            picked_genres: [], 
            next_movies: [],
            history: [], //{name: "", rating: #}

            activeStep: 0, 
        }

    }

    setUsername = (val) => {
        this.setState({ username: val.target.value });
    }
    addOtherUsers = (val) => {
        console.log("Add other users call"); 
        console.log(this.state.people);
        console.log(val)
        if (val !== this.state.username){
            if(this.state.people.indexOf(val) === -1)
                this.setState({people: this.state.people.concat({name: val})});
        } 
    }
    findOtherUsers = () => {
        socket.on("New User Joined", function(user) {
            // Connected, let's sign-up for to receive messages for this room
            this.addOtherUsers(user)
            console.log("New User Joined ")
            console.log(this.state.people)
        }.bind(this));
    }
    submitUsername = (e) =>  {
        console.log('Username submitted');
        console.log(this.state.username);
        this.setState({ username: this.state.username });
        socket.emit('send-nickname', this.state.username);
        console.log("Connecting send nickname...")
        e.preventDefault();
    }

    setFriend = (val) => {
        this.setState({ friend: val.target.value});
    }

    submitFriend = (e) => {
        console.log('Friend submitted');
        console.log(this.state.friend);
    }

    addPerson = (val) => {
        
        if (val !== this.state.username){
            if(this.state.people.indexOf(val) === -1)
                this.setState({people: this.state.people.concat({name: val})});
        } 
    }

    submitServices = (e) => {
        console.log("services submitted"); 
        console.log(this.state.picked_services);
    }

    handleNext = () => {
        console.log("Index handle next called");
        console.log(this.state.activeStep);
        this.setState({activeStep: this.state.activeStep+1});
        if(this.state.activeStep === 2) {
            //socket call for first movie 
        }
    }
 
    handleBack = () => {
       console.log("Index handle back called");
       console.log(this.state.activeStep);
       this.setState({activeStep: this.state.activeStep-1});
    }

    handleReset = () => {
        console.log("reset called")
        this.setState({activeStep: 1});
    }




    render() {
        this.findOtherUsers();
        return (
            <div>  
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                
                <Grid container direction="row" justify="center" alignItems="center" className={homeStyles.container1} > 
                    <Grid container direction="row" justify="center" alignItems="center" className={homeStyles.container2} >
                    {this.state.activeStep == 0 &&
                    (
                        <Button variant="contained" color="primary" onClick={() => this.handleNext()}>Start</Button>
                    )}
                    {this.state.activeStep === 1 &&
                    (
                        <MainStepper username={this.state.username} setUsername={this.setUsername} submitUsername={this.submitUsername}
                                     friend={this.state.friend} people={this.state.people} setFriend={this.setFriend} submitFriend={this.submitFriend} 
                                     picked_services={this.state.picked_services} submitServices={this.submitServices}
                                     finishOptions={this.handleNext}/>
                    )}
                    {this.state.activeStep === 2 &&
                    (
                        <Button variant="contained" color="primary" onClick={this.handleReset}>Reset</Button>
                    )}
                        

                    </Grid>          
                </Grid>
            </div>
            
        );
    }
};

export default MainApp;