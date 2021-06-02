import React, { Component } from 'react';
import { Box } from '@bit/grommet.grommet.box';
import { RadioButton } from '@bit/grommet.grommet.radio-button';

export default class RadioBtns extends Component {
    constructor(props) {
        super(props)
        this.state = {
            people: this.props.people
        }
    }

    render() {
        //const { selected } = this.state;
        return (
            <Box align='start'>
                {this.state.people && this.state.people.map(labels => (
                    <Box key={labels} margin={{ vertical: 'small' }}>
                        <RadioButton
                            name='prop'
                            label={labels}
                            onChange={this.props.onChange}
                        />
                    </Box>
                ), this)}
            </Box>
        )
    }
}