import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { StylesProvider} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'

import disneyIcon from '../images/disney_icon.svg'
import netflixIcon from '../images/netflix_icon.svg'
import primeIcon from '../images/prime_video.svg'
import huluIcon from '../images/hulu_icon.svg'

import "./servicestyles.css"

const { Component } = React;


class ServiceCheckBoxes extends Component {
    constructor(props) {
        super(props)
        //need from props: value, onChange -> directly added to directly change  
        this.state = {
            title: "Services",
            lP: "top", 
            services: [{name: 'Prime', icon: primeIcon},{name: 'Netflix',icon: netflixIcon},
                       {name: 'Disney', icon: disneyIcon},{name: 'Hulu',icon: huluIcon}],
        }
    }


    render() {
        return(
          <div className="servicesContainer">
            <StylesProvider injectFirst>
            <FormControl component="fieldset" className="checkboxes">
                <FormLabel component="legend">{"You can select multiple"}</FormLabel>
                <FormGroup >
                <Grid container direction="row" justify="center" alignItems="center" >
                    {this.state.services && this.state.services.map(function(item,i){
                        return <Grid item xs={3} key={i}>
                            <FormControlLabel 
                                value={item.name}
                                control={<Checkbox />}
                                labelPlacement={this.state.lP}
                                label={
                                  <img src={item.icon}/>
                                }
                            />
                            </Grid>
                    }, this)}
                    </Grid>
                </FormGroup>
            </FormControl>
            </StylesProvider>
          </div>
            
        )
    }
}
/*
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Assign responsibility</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={gilad} onChange={handleChange} name="gilad" />}
            label="Gilad Gray"
          />
          <FormControlLabel
            control={<Checkbox checked={jason} onChange={handleChange} name="jason" />}
            label="Jason Killian"
          />
          <FormControlLabel
            control={<Checkbox checked={antoine} onChange={handleChange} name="antoine" />}
            label="Antoine Llorca"
          />
        </FormGroup>
        <FormHelperText>Be careful</FormHelperText>
      </FormControl>
 */
export default ServiceCheckBoxes