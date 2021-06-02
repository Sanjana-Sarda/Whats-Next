import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import SvgIcon from '@material-ui/core/SvgIcon';
import { LabelSharp } from '@material-ui/icons';

const { Component } = React;

class CheckboxButtons extends Component {
    constructor(props) {
        super(props)
        //need from props: value, onChange -> directly added to directly change  
        this.state = {
            items: this.props.items, //needs to have name and icon
            title: this.props.title,
            lP: this.props.lP, 
        }
    }
    render() {
        console.log("Checkbox Buttons called")
        console.log(this.state.items)
        return(
            <FormControl component="fieldset" className="checkboxes">
                <FormLabel component="legend">{this.state.title}</FormLabel>
                <FormGroup value={this.props.value} onChange={this.props.onChange}>
                    {this.state.items && this.state.items.map(function(labels,i){
                        return <div key={i}>
                            <FormControlLabel 
                                value={labels.name}
                                control={<Checkbox />}
                                labelPlacement={this.state.lP}
                                label={labels.name}
                                onChange={this.props.onChange}
                            />
                            </div>
                    }, this)}
                </FormGroup>
            </FormControl>
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
export default CheckboxButtons