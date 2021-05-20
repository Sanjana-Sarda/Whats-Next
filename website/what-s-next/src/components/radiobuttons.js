import * as React from 'react'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const { Component } = React;



class RadioButtons extends Component {
    constructor(props) {
        super(props)
        this.state = {
            people: this.props.people
        }
    }
    render() {
        console.log("Radio Buttons called")
        console.log(this.state.people)
        return(
            <FormControl component="fieldset">
                <FormLabel component="legend">Found Nearby Friends...</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={this.props.value} onChange={this.props.onChange}>
                    {this.state.people && this.state.people.map(function(labels){
                        return <div>
                            <FormControlLabel 
                                value={labels.name}
                                control={<Radio />}
                                label={labels.name}
                                onChange={this.props.onChange}
                            />
                            </div>
                    }, this)}
                </RadioGroup>
            </FormControl>
        )
    }
}

/*
<FormControl component="fieldset">
      <FormLabel component="legend">Gender</FormLabel>
      <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
        <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
      </RadioGroup>
    </FormControl>

    {this.state.people && this.state.people.map(function(labels){
                    return <div className="radio">
                        <label key={labels.name} >
                            <input type="radio" 
                                name="btngroup"
                                value={labels.name}
                                key={labels.name}
                                onChange={this.props.onChange}
                                className="radio"
                            />
                        {labels.name}
                        </label>
                    </div>
                }, this)}
*/ 
export default RadioButtons