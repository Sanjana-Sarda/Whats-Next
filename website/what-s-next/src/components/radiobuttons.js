import * as React from 'react'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { StylesProvider} from '@material-ui/core/styles';

import "./radiobuttons.css"

const { Component } = React;



class RadioButtons extends Component {

    render() {
        console.log("Radio Buttons called")
        console.log(this.props.people)
        return(
            <FormControl component="fieldset">
                <FormLabel component="legend">Searching For Nearby Users...</FormLabel>

                <StylesProvider injectFirst>
                <RadioGroup aria-label="people" name="people1" value={this.props.value} onChange={this.props.onChange}>
                    <div className="ginger" >
                    {this.props.people && this.props.people.map(function(labels,i){
                        return <div key={i}>
                            <FormControlLabel 
                                value={labels.name}
                                control={<Radio />}
                                label={labels.name}
                                onChange={this.props.onChange}
                                
                            />
                            </div>
                    }, this)}
                    </div>
                    
                </RadioGroup>
                </StylesProvider>
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