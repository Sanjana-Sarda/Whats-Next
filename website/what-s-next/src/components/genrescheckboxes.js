import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Grid from '@material-ui/core/Grid'

import * as styles from './genres.module.css'

const { Component } = React;

class GenresCheckboxes extends Component {
    constructor(props) {
        super(props)
        //need from props: value, onChange -> directly added to directly change  
        this.state = {
            title: "Scroll for more genres",
            lP: "end", 
            genres: [{name: 'Action'},{name: 'Sci-Fi'},{name: 'Adventure'},{name: 'Comedy'},
                        {name: 'Western'},{name: 'Animation'},{name: 'Fantasy'},{name: 'Biography'},
                      {name: 'Drama'},{name: 'Music'},{name: 'War'},{name: 'Crime'},
                      {name: 'Fantasy'},{name: 'Thriller'},{name: 'Romance'},{name: 'History'},
                      {name: 'Mystery'},{name: 'Horror'},{name: 'Sport'},{name: 'Documentary'},
                      {name: 'Musical'},{name: 'News'},{name: 'Short'},{name: 'Reality-TV'},
                      {name: 'Film-Noir'},{name: 'Talk Show'}]

        }
    }


    render() {
        return(
          <div className={styles.root}>
            <FormControl component="fieldset" >
                <FormLabel component="legend">{this.state.title}</FormLabel>
                <FormGroup >
                <Grid container direction="row" justify="center" alignItems="center" >
                    {this.state.genres && this.state.genres.map(function(item,i){
                        return <Grid item xs={6} key={i}>
                            <FormControlLabel 
                                value={item.name}
                                control={<Checkbox />}
                                labelPlacement={this.state.lP}
                                label={item.name}
                                onChange={this.props.onChange}
                            />
                            </Grid>
                    }, this)}
                    </Grid>
                </FormGroup>
            </FormControl>
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
export default GenresCheckboxes