import * as React from 'react'
import CheckboxButtons from "./checkboxbuttons"
import { Button } from '@bit/grommet.grommet.button'

const { Component } = React;

class SearchMenu extends Component {
     constructor(props) {
        super(props)
        this.state = {
             services: [{name: 'Action'},{name: 'Sci-Fi'},{name: 'Adventure'},{name: 'Comedy'}],
             genres: [{name: 'Western'},{name: 'Animation'},{name: 'Fantasy'},{name: 'Biography'},
                      {name: 'Drama'},{name: 'Music'},{name: 'War'},{name: 'Crime'},
                      {name: 'Fantasy'},{name: 'Thriller'},{name: 'Romance'},{name: 'History'},
                      {name: 'Mystery'},{name: 'Horror'},{name: 'Sport'},{name: 'Documentary'},
                      {name: 'Musical'},{name: 'News'},{name: 'Short'},{name: 'Reality-TV'},
                      {name: 'Film-Noir'},{name: 'Talk Show'}],
             picked_services: [],
             picked_genres: [], 

        }
    } 
    submitOptions = (e) => {
        e.preventDefault(); 
        console.log('Options submitted - Index') 
        console.log(this.state.picked_services)
        console.log(this.state.picked_genres)
    }
    getServices = (val) => {
        if(val.target.checked){
            this.setState({
                picked_services: this.state.picked_services.concat(val.target.value)
              })
        }
        else{
            var array = [...this.state.picked_services]; // make a separate copy of the array
            var index = array.indexOf(val.target.value)
            if (index !== -1) {
                array.splice(index, 1);
                this.setState({picked_services: array});
            }
        }
    }
    getGenres = (val) => {
        if(val.target.checked){
            this.setState({
                picked_genres: this.state.picked_genres.concat(val.target.value)
              })
        }
        else{
            var array = [...this.state.picked_genres]; // make a separate copy of the array
            var index = array.indexOf(val.target.value)
            if (index !== -1) {
                array.splice(index, 1);
                this.setState({picked_genres: array});
            }
        }
    }
    render() {
        console.log("Search Menu called")
        console.log(this.props.people)
        return (
            <div>
                <div>
                    <CheckboxButtons items={this.state.services} title="Services" value={this.picked_services}
                    onChange={this.getServices}/>
                </div>
                <div>
                    <CheckboxButtons items={this.state.genres} title="Genres" value={this.picked_genres}
                    onChange={this.getGenres}/>
                </div>
                <div>
                    <Button type="submit" primary={false} label='Submit' onClick={this.submitOptions}/>
                </div>
                
                
            </div>
          )
    }
  }
  
  export default SearchMenu