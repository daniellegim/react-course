import React, {useState} from "react"
import { makeStyles } from '@material-ui/core/styles'
import Card from "./Card"
import Fab from '@material-ui/core/Fab'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Tooltip from '@material-ui/core/Tooltip'
import Grid from '@material-ui/core/Grid'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import {useCartUpdate} from './CartContext'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  }
}))

class Course extends React.Component {
  //const classes = useStyles()

  constructor() {
      super()
      this.state = {
          courses: [],
          selectedCourses: [],
          openSnackbar: false,
      }

      this.handleCourseSelected = this.handleCourseSelected.bind(this)
      this.handleCourseRemoved = this.handleCourseRemoved.bind(this)
      this.handleAddToCart = this.handleAddToCart.bind(this)
      this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this)

  }
  //const updateCart = useCartUpdate()

  componentDidMount() {
      const courses = this.props.courses.map(course => <Card key={course.name} 
        course={course}
        handleCourseSelected={this.handleCourseSelected}
        handleCourseRemoved={this.handleCourseRemoved}/>)
        console.log(courses)
    this.setState({courses: courses})
  }

  handleCourseSelected(value) {
      this.setState({selectedCourses: [...this.state.selectedCourses, value]})
  }

  handleCourseRemoved(value) {
      const filtered = this.state.selectedCourses.filter(course => (course.name !== value.name))
      this.setState({selectedCourses: filtered})
  }
  
  handleAddToCart() {
    //updateCart(selectedCourses)
    this.setState({openSnackbar: true})
    this.setState({selectedCourses: []})
  }

  handleCloseSnackbar(event, reason) {
    if (reason === 'clickaway') {
      return
    }

    this.setState({openSnackbar: false})
  }

  render() {
      return(
        <div>
        <Grid container>
            <Grid item>
            { this.state.selectedCourses.length !== 0 &&
                <Tooltip title="Add to cart">
                <Fab  onClick={this.handleAddToCart} aria-label="add">
                    <AddShoppingCartIcon />
                </Fab>
                </Tooltip>
            } 
            </Grid>
            <Grid item xs={11}>
            {this.state.courses}
            </Grid>
        </Grid>
        <Snackbar open={this.state.openSnackbar} autoHideDuration={3000} onClose={this.handleCloseSnackbar}>
            <MuiAlert onClose={this.handleCloseSnackbar} severity="success" elevation={6} variant="filled">
            Courses were added successfully!
            </MuiAlert>
        </Snackbar>
        </div>
        )
    }
}

export default Course