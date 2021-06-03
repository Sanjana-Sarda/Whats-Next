import React from 'react';
import { makeStyles, withStyles, StylesProvider} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import RadioButtons from "./radiobuttons"
import ServiceCheckboxes from "./servicescheckboxes"
import GenresCheckboxes from "./genrescheckboxes"
import StepConnector from '@material-ui/core/StepConnector';
import clsx from 'clsx';
import Check from '@material-ui/icons/Check';
import * as styles from "/src/components/main_stepper.module.css"
import "./stepperstyles.css"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import TitleLine from "/src/images/title_line.svg"
import { PlayCircleFilledWhite } from '@material-ui/icons';

const { Component } = React;

const QontoConnector = withStyles({
    root: {
      backgroundColor: 'black',
    },
    alternativeLabel: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    active: {
      '& $line': {
        borderColor: '#70DCF1',
      },
    },
    completed: {
      '& $line': {
        borderColor: '#70DCF1',
      },
    },
    line: {
      borderColor: '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  })(StepConnector);

  const useQontoStepIconStyles = makeStyles({
    root: {
      color: '#eaeaf0',
      display: 'flex',
      height: 22,
      alignItems: 'center',
      
    },
    active: {
      color: '#70DCF1',
    },
    circle: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
    completed: {
      color: '#70DCF1',
      zIndex: 1,
      fontSize: 18,
    },
  });
  
  function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
        })}
      >
        {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
      </div>
    );
  }


  const theme = createMuiTheme({
    overrides: {
        label: {
            root: {
                color: "white",
            },
            "&$focused": {
                color: "white"
            }
        },
        MuiFormLabel: {
            root: {
                "&" : {
                    color: "white",
                },
                "&$focused ": {
                    color: "#70DCF1",
                }
              },
              
            
        },
        MuiInputBase: {
            root: {
                color: "white",
            }
        },
      MuiOutlinedInput: {
        root: {
          "& $notchedOutline": {
            borderColor: "white"
          },
          "&:hover $notchedOutline": {
            borderColor: "#70DCF1"
          },
          "&$focused $notchedOutline": {
            borderColor: "#70DCF1"
          }
        }
      }
    }
  });
function getSteps() {
    return ['Set Username','Find Friend','Select Services','Select Genres'];
  }
  
function getStepContent(step) {
    switch (step) {
        case 0:
            return 'Pick Your Username...';
        case 1:
            return 'Find Your Friend...';
        case 2:
            return 'Set Your Services...';
        case 3:
            return 'Set Your Genres...';
        case 4:
            return 'Ready To Start Matching?';
        default:
            return 'Unknown step';
    }
  }

class MainStepper extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            friend: '',
            people: [],
            response: '',
            picked_services: [],
            picked_genres: [],
            activeStep: 0,
            steps: getSteps(),

            
        }

    }

/*     const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps(); */
  
  
     handleNext = () => {
         console.log("handle next called");
         console.log(this.state.activeStep);
      this.setState({activeStep: this.state.activeStep+1});
    };
  
     handleBack = () => {
        console.log("handle back called");
        console.log(this.state.activeStep);
        this.setState({activeStep: this.state.activeStep-1});
    };
    
    setUsername = (val) => {
        this.setState({ username: val.target.value });
        this.console.log("username changed")
        this.console.log(this.state.username)
    }

    handleReset = () => {
        this.setState({activeStep: 0});
    }

    onSubmitUsername = (e) => {
        this.props.submitUsername(e); 
        this.handleNext(); 
    }

    onSubmitFriend = (e) => {
        this.props.submitFriend(); 
        this.handleNext(); 
    }

    getServices = (val) => {
        if(val.target.checked){ 
            if(this.state.picked_services != [])
                this.state.picked_services = this.state.picked_services.concat(val.target.value)
            
        }
        else{
            var array = [...this.state.picked_services]; // make a separate copy of the array
            var index = array.indexOf(val.target.value)
            if (index !== -1) {
                array.splice(index, 1);
                this.state.picked_services=array;
            }
        }
    }

    onSubmitSerivces = (e) => {
        this.props.submitServices(); 
        this.handleNext(); 
    }

    render() {
 
        return (
            <div className={styles.root}>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <Grid container direction="column" justify="space-between" alignItems="center" >
                    <Grid item xs={12}>
                        <Grid container direction="column" justify="space-between" alignItems="center" className={styles.titleLogo}>
                            <Typography variant="h3" component="h2" gutterBottom className={styles.title} >
                                {getStepContent(this.state.activeStep)}
                            </Typography>
                            <img src={TitleLine}/>
                        </Grid>
                       
                    </Grid>
                    
                    
                    {this.state.activeStep === 0 &&
                    (<Grid item xs={12} >
                        <div className={styles.textfield}>
                        <MuiThemeProvider theme={theme}>
                        <TextField value={this.props.username} onChange={this.props.setUsername}  
                                       id="outlined-basic" label="Username" variant="outlined"  />
                        </MuiThemeProvider>
                            
                        </div> 
                        <br/>
                        <Button variant="contained" color="primary" onClick={this.onSubmitUsername} className={styles.submit_btn} >
                                {'Next'}
                        </Button>
                    </Grid>)}

                    {this.state.activeStep === 1 &&
                    (<Grid item xs={12} >
                        <div className={styles.radiobtns}>
                        <RadioButtons people={this.props.people} value={this.props.friend}
                        onChange={this.props.setFriend}/>
                        </div>
                        <br/>
                        <Button variant="contained" color="primary" onClick={this.onSubmitFriend} className={styles.submit_btn} style={{marginLeft:-10,marginTop:-20}}>
                                {'Next'}
                        </Button>
                    </Grid>)}

                    {this.state.activeStep === 2 &&
                    (<Grid item xs={12} >
                        <ServiceCheckboxes />
                        <br/>
                        <Button variant="contained" color="primary" onClick={this.onSubmitSerivces} className={styles.submit_btn} style={{marginLeft:-15,marginTop:-10}}>
                                {'Next'}
                        </Button>
                    </Grid>)}

                    {this.state.activeStep === 3 &&
                    (<Grid item xs={12} >
                        <GenresCheckboxes />
                        <br/>
                        <Button variant="contained" color="primary" onClick={this.onSubmitSerivces} className={styles.submit_btn} style={{marginLeft:-10}} >
                                {'Next'}
                        </Button>
                    </Grid>)}

                    {this.state.activeStep === 4 &&
                    (<Grid item xs={12} >
                        <div className={styles.finalPage}>
                            <Button variant="contained" color="primary" onClick={this.props.finishOptions} className={styles.startMatchingBtn} >
                                    {'Start Matching'}
                            </Button>
                        </div>
                    </Grid>)}


                    <Grid item xs={12}>
                    <StylesProvider injectFirst>
                        <Stepper alternativeLabel activeStep={this.state.activeStep} connector={<QontoConnector />} className={styles.stepper}>
                            {this.state.steps.map((label)=>(
                                <Step key={label} >
                                    <StepLabel StepIconComponent={QontoStepIcon} >{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </StylesProvider>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <div>
                            {this.state.activeStep === this.state.steps.length ? (
                                <div>
                                    <Typography>All steps completed</Typography>
                                    <Button variant="contained" color="primary" onClick={this.handleReset}>Reset</Button>
                                </div>
                            ):(
                                <div>
                                    <div>
                                        <Button disabled={this.state.activeStep === 0} color="primary" onClick={this.handleBack}>
                                            Back
                                        </Button>
                                        <Button variant="contained" color="primary" onClick={this.handleNext}>
                                            {this.state.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                        
                                    </div>
                                </div>
                            )}
                        </div>
                    </Grid>
                </Grid>
                
            </div>
            
        );
    }
};

export default MainStepper;