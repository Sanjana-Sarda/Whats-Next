import * as React from 'react'
import RadioButtons from "./radiobuttons"
import { Button } from '@bit/grommet.grommet.button'

const { Component } = React;

class SearchMenu extends Component {
/*     constructor(props) {
        super(props)
        this.state = {
            people: this.props.people,
            friend: this.props.value
        }
    } */
    render() {
        console.log("Search Menu called")
        console.log(this.props.people)
        return (
            <div>
                <RadioButtons people={this.props.people} value={this.props.value}
                onChange={this.props.onChange}/>
                <div>
                    <Button type="submit" primary={false} label='Submit' onClick={this.props.submitFriend}/>
                </div>
                
                
            </div>
          )
    }
  }
  
  export default SearchMenu