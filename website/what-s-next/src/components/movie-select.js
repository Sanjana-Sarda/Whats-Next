import * as React from 'react'
import Button from '@material-ui/core/Button';
import MovieCard from './moviecard'

const { Component } = React;

class MovieSelect extends Component {
    render() {
        return (
            <div>
                <MovieCard movieTitle={this.props.movieTitle}/>
                <div  className="ratings">
                    <Button variant="contained" color="secondary">
                        Yes
                    </Button>
                    <Button variant="contained" color="primary">
                        No
                    </Button>
                    <Button variant="contained" color="secondary">
                        Liked
                    </Button>
                    <Button variant="contained" color="primary">
                        Disliked
                    </Button>
                </div>
            </div>

          )
    }
  }
  
  export default MovieSelect