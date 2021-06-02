import * as React from 'react'
import { Button } from '@bit/grommet.grommet.button'
import Input from './input/index'

const { Component } = React;

class EnterMenu extends Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.onSubmit}>
                    <label>
                        
                        <Input placeholder="Enter your username" type="text" value={this.props.value} onChange={this.props.onChangeValue} icon="Mail"/>
                    </label>
                    <br/>
                    <br/>
                    <Button type="submit" primary={false} label='Submit'/>
                </form>
            </div>
          )
    }
  }
  
  export default EnterMenu