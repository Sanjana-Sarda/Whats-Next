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
import { Icon } from "@material-ui/core";
import starfaceIcon  from '../images/starface_icon.svg'
import thumbsupIcon from '../images/thumbsup_icon.svg'
import trashIcon from '../images/trash_icon.svg'
import frownIcon from '../images/frown_icon.svg'
import unicornLogo from "../images/unicornLogo.svg"

import TitleLine from "/src/images/title_line.svg"

import { StylesProvider} from '@material-ui/core/styles';

import "./button.css"

const ENDPOINT = "http://lvh.me:4001/"; //"http://lvh.me:4001";


const { Component } = React;

const socket = socketIOClient(ENDPOINT);
var room = "abc123";
socket.on('connection', function() {
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
            
            final_movie: "", 

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
    setFinalMovie = (movie) => {
        console.log(this.state.final_movie); 
        this.setState({activeStep: 3,
            final_movie: movie}); 
    }
    waitForMatch = () => {
        socket.on("match found", function(movie) {
            // Connected, let's sign-up for to receive messages for this room
            this.setFinalMovie(movie);
            
        }.bind(this));
    }
    setThirdMovie = (movie) => {
        console.log("Set third movie"); 
        console.log(this.state.third_movie); 
        this.setState({third_movie: [movie]});
    }
    waitforThird = () => {
        socket.on("adding third movie", function(movie){
            this.setThirdMovie(movie); 
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

    makeFirstMovieRequest = async () => {
        if(this.state.activeStep === 2) {
            console.log("Requesting first movie api")
            await axios.post(`https://whats-next-188.herokuapp.com/ini`,  {'nservices':this.state.nservices,'ngenres':this.state.ngenres} )
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    this.setState({first_movie: this.state.first_movie.concat(res.data.first),
                                    second_movie: this.state.second_movie.concat(res.data.second)}, () => {
                        this.getMovieInfo(this.state.first_movie[0])
                    });
                })
                .catch(err => {
                    console.log(err); 
                });     
        }
    }
     makeMovieRequest = async () => {
        console.log("Movie Request called");
        console.log({'nservices':this.state.nservices,
        'ngenres':this.state.ngenres,
        'first': this.state.first_movie,
        'second': this.state.second_movie,
        'history': this.state.history});
        let joined = []; 
        joined = joined.concat(this.state.first_movie[0]);
        joined = joined.concat(this.state.second_movie[0]);
        if(this.state.third_movie.length > 1)
            joined = joined.concat(this.state.third_movie[0]);
        this.setState({ 
            history: this.state.history.concat(joined)
        }); 
        await axios.post(`https://whats-next-188.herokuapp.com/recs`,  {'nservices':this.state.nservices,
                                                                        'ngenres':this.state.ngenres,
                                                                        'first': this.state.first_movie,
                                                                        'second': this.state.second_movie,
                                                                        'history': this.state.history} )
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    
                    this.setState({first_movie: [res.data.first],
                                   second_movie: [res.data.second]}, () => {
                        this.getMovieInfo(this.state.first_movie[0])
                    });
                })
                .catch(err => {
                    console.log(err); 
                });
          
        

    }
    movieClick = async (rating) => {
        console.log("Movie Click called");
        console.log(this.state.first_movie);
        console.log(this.state.second_movie);
        console.log(this.state.third_movie);

        if(this.state.first_movie.length === 1){
            if(rating === 4) {
                socket.emit('swiped-four', this.state.first_movie[0])
            }
            this.setState({ 
                first_movie: this.state.first_movie.concat([rating])
            });
            this.getMovieInfo(this.state.second_movie[0]);
            
        }
        else if(this.state.second_movie.length === 1){
            if(this.state.third_movie.length===1){
                if(rating === 4) {
                    socket.emit('swiped-four', this.state.second_movie[0])
                }
                this.setState({ 
                    second_movie: this.state.second_movie.concat([rating])
                });
                this.getMovieInfo(this.state.third_movie[0]);
                
            }
            else {
                if(rating === 4) {
                    socket.emit('swiped-four', this.state.second_movie[0])
                }
                this.setState({ 
                    second_movie: this.state.second_movie.concat([rating])
                }, () => {
                     this.makeMovieRequest();
                });
            
            }
            
 
        }
        else {
            
            if(this.state.third_movie.length === 1){
                if(rating === 4) {
                    socket.emit('swiped-four', this.state.third_movie[0])
                }
                this.setState({ 
                    third_movie: this.state.third_movie.concat([rating])
                }, () => {
                     this.makeMovieRequest();
                });
                
            }
            
        }
        console.log("Updated movies"); 
        console.log(this.state.first_movie);
        console.log(this.state.second_movie);
        console.log(this.state.third_movie);
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
        this.setState({activeStep: 1,
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
            movie_description: "",});
    }

    

    render() {
        this.findOtherUsers();
        this.waitforThird(); 
        this.waitForMatch(); 
        return (
            <div>  
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <StylesProvider injectFirst>
                <Grid container direction="row" justify="center" alignItems="center" className={homeStyles.container1} > 
                    <Grid container direction="row" justify="center" alignItems="center" className={homeStyles.container2} >
                    {this.state.activeStep === 0 &&
                    (
                        <Grid container direction="column" justify="center" alignItems="center">
                            <img src={unicornLogo} height={150} width={300} alt="unicorn logo"/>
                            
                            <img src={TitleLine} alt="titleline"/>
                            <Grid container className={homeStyles.textcontainer}>
                            <Typography variant="body2" component="p" className={homeStyles.starttext}>
                                A ML-driven application to find movie recommendations between two people. 
                                Click start to find what movie you should watch next. 
                            </Typography>
                            </Grid>
                            <Button variant="contained"  onClick={() => this.handleNext()} className={homeStyles.btnstyle}>Start</Button>
                        </Grid>
                        
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
                                <Grid>
                                <IconButton aria-label="delete" onClick={() => this.movieClick(1)}>
                                   
                                   <img src={frownIcon} height={50} width={50} alt="frown icon"/>
                                    
                                </IconButton>
                                
                                <IconButton aria-label="delete" onClick={() => this.movieClick(2)}>
                                   
                                        <img src={trashIcon} height={50} width={50} alt="trash icon"/>
                                    
                                </IconButton>

                                <IconButton aria-label="delete" onClick={() => this.movieClick(3)}>
                                   
                                        <img src={thumbsupIcon} height={50} width={50} alt="thumbs up icon"/>
                                    
                                </IconButton>

                                <IconButton aria-label="delete" onClick={() => this.movieClick(4)}>
                                 
                                        <img src={starfaceIcon} height={50} width={50} alt="starface icon"/>
                                   
                                </IconButton>
                                </Grid>
                            
                            </CardActions>
                        </Card>

                        
                       
                        </div>
                        
                      
                    )}
                    {this.state.activeStep === 3 &&
                    (
                        <div>
                            <Typography variant="body2" component="p" className={homeStyles.cardfont}>
                                Match Found!
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2" className={homeStyles.cardfont}>
                                {this.state.final_movie}
                            </Typography>
                            <Button variant="contained" color="primary" onClick={this.handleReset}>
                                Reset
                            </Button>
                        </div>
                        
                    )}
                        

                    </Grid>          
                </Grid>
                </StylesProvider>
            </div>
            
        );
    }
};

export default MainApp;