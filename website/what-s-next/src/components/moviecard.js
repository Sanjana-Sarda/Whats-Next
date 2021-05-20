import * as React from 'react'
import Button from '@material-ui/core/Button';

const { Component } = React;

class MovieCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
             movieTitle: this.props.movieTitle
             //add in additional information for movie from api later 
        }
    } 
    render() {
        return (
            <div>
                <Button variant="outlined">
                    {this.state.movieTitle}
                </Button>
            </div>

          )
    }
  }
  
  export default MovieCard