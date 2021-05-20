import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


const { Component } = React;

class CheckboxButtons extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: this.props.items,
            title: this.props.title
        }
    }
    render() {
        console.log("Checkbox Buttons called")
        console.log(this.state.items)
        return(
            <FormControl component="fieldset" className="checkboxes">
                <FormLabel component="legend">{this.state.title}</FormLabel>
                <FormGroup value={this.props.value} onChange={this.props.onChange}>
                    {this.state.items && this.state.items.map(function(labels){
                        return <div>
                            <FormControlLabel 
                                value={labels.name}
                                control={<Checkbox />}
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