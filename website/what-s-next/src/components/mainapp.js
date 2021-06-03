import * as React from 'react'
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid'
import * as homeStyles from "/src/components/mainapp.module.css"
import MainStepper from '/src/components/main_stepper'
import Button from '@material-ui/core/Button';
import socketIOClient from "socket.io-client";
import axios from 'axios'; 
import IconButton from '@material-ui/core/IconButton';
import { ReactComponent as starfaceIcon }  from '../images/starface_icon.svg'
import thumbsupIcon from '../images/thumbsup_icon.svg'
import trashIcon from '../images/trash_icon.svg'
import frownIcon from '../images/frown_icon.svg'

const ENDPOINT = "https://whats-next-server.herokuapp.com/"; //"http://lvh.me:4001";


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
            history: [],
            nservices: ['Disney+', 'Prime Video', 'Hulu', 'Netflix'],
            ngenres: ['Action', 'Sci-Fi', 'Adventure', 'Comedy', 'Western', 
                          'Animation', 'Fantasy', 'Biography', 'Drama', 'Music', 
                          'War', 'Crime', 'Fantasy', 'Thriller', 'Romance', 'History', 
                          'Mystery', 'Horror', 'Sport', 'Documentary', 'Musical', 
                          'News', 'Short', 'Reality-TV', 'Film-Noir', 'Talk Show'],
            first_movie: [],
            second_movie: [],
            third_movie: [],

            picked_services: [], 
            picked_genres: [], 
            next_movie: [],

            movie_title: "", 
            movie_image_url: "", 
            movie_description: "",
            

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
            //vendors.filter(e => e.Name === 'Magenic').length > 0
            if(!(this.state.people.some(e=> e.name===val)))
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

    submitServices = (serv) => {
        this.setState({
            picked_services: serv,
        }, () => {
            console.log(this.state.picked_services);
        });
        var arr = [...this.state.nservices];
        serv.forEach((s) => {
            
            var index = arr.indexOf(s); 
            console.log("Service Index");
            console.log(index);
            if(index !== -1){
                arr.splice(index,1);
                
            }
        });
        this.setState({
            nservices: arr
        }, () => {
            console.log(this.state.nservices);
        }); 
        console.log("services submitted"); 
    }
    submitGenres = (gen) => {
        this.setState({
            picked_genres: gen,
        }, () => {
            console.log(this.state.picked_genres);
        });
        var arr = [...this.state.ngenres];
        gen.forEach( (s) => {
            var index = arr.indexOf(s); 
            console.log(index);
            if(index !== -1){
                arr.splice(index,1);
                
            }
        });
        this.setState({
            ngenres: arr
        }, () => {
            console.log(this.state.ngenres);
        }); 
        console.log("genres submitted"); 

    }

    makeFirstMovieRequest = () => {
        if(this.state.activeStep === 2) {
            console.log("Requesting first movie api")
            const req = {
                nservices: this.state.nservices,
                ngenres: this.state.ngenres,
            };
            const req2 = JSON.stringify({req}); 
            console.log(req2); 
            axios.post(`https://whats-next-188.herokuapp.com/ini`, { req2 })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err); 
                    this.setState({first_movie: ["The Dark Knight"]}, () => {
                        this.getMovieInfo(this.state.first_movie[0])
                    });
                });
            /* socket.emit('pick_first_movie');
            socket.on('Sending First Movie', function(val){
                console.log("Getting socket first movie"); 
                console.log(val);
            }); */
            
        }
    }

    getMovieInfo = async (m) => {
        console.log("attempting movie search"); 
        const url = `https://api.themoviedb.org/3/search/movie?api_key=08d1fafe7afc10001a91d0af8a2ab33d&language=en-US&query=${m}&page=1&include_adult=false`;
        try {
            const res = await fetch(url);
            const data  = await res.json();
            console.log(data.results[0].id);
            //original_title, overview, poster_path https://image.tmbd.org/t/p/w185_and_h278_bestv2/{poster_path}
            this.setState({
                movie_title: data.results[0].original_title, 
                movie_description: data.results[0].overview, 
                movie_image_url: 'https://image.tmdb.org/t/p/original/'
                                 + data.results[0].poster_path,
            }, () => {
                console.log(this.state.movie_image_url)
            });
        }catch(err){
            console.log("No movie info found");
            console.error(err);
        }
  
    }

    handleNext = () => {
        console.log("Index handle next called");
        this.setState({activeStep: this.state.activeStep+1}, () => {
            this.makeFirstMovieRequest();
        });
        
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
                    {this.state.activeStep === 0 &&
                    (
                        <Button variant="contained" color="primary" onClick={() => this.handleNext()}>Start</Button>
                    )}
                    {this.state.activeStep === 1 &&
                    (
                        <MainStepper username={this.state.username} setUsername={this.setUsername} submitUsername={this.submitUsername}
                                     friend={this.state.friend} people={this.state.people} setFriend={this.setFriend} submitFriend={this.submitFriend} 
                                     picked_services={this.state.picked_services} submitServices={this.submitServices}
                                     picked_genres={this.state.picked_genres} submitGenres={this.submitGenres}
                                     finishOptions={this.handleNext}/>
                    )}
                    {this.state.activeStep === 2 &&
                    (
                        <div>
                        
                        <Card className={homeStyles.card}>
                            <CardActionArea >
                                <CardMedia
                                className={homeStyles.cardmedia}
                                image={this.state.movie_image_url}
                                title={this.state.movie_title}
                                />
                                <CardContent className={homeStyles.cardtext}>
                                    <Typography gutterBottom variant="h5" component="h2" className={homeStyles.cardfont}>
                                        {this.state.movie_title}
                                    </Typography>
                                    <Typography variant="body2" component="p" className={homeStyles.cardfont}>
                                        {this.state.movie_description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions  className={homeStyles.cardbuttons}>
                            <Button variant="contained" color="primary" onClick={this.handleReset}>
                                Reset
                            </Button>
                            <IconButton aria-label="delete">
                                <starfaceIcon />
                            </IconButton>
                            </CardActions>
                        </Card>
                       
                        </div>
                        
                      
                    )}
                        

                    </Grid>          
                </Grid>
            </div>
            
        );
    }
};

export default MainApp;