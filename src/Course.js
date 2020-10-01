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

function Course(props) {
  const classes = useStyles()

  const [selectedCourses, setSelectedCourses] = useState([])
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const updateCart = useCartUpdate()

  const handleCourseSelected = (value) => {
    setSelectedCourses([...selectedCourses, value])
  }

  const handleCourseRemoved = (value) => {
    setSelectedCourses(selectedCourses.filter(course => (course.name !== value.name)))
  }
  
  const handleAddToCart = () => {
    updateCart(selectedCourses)
    setOpenSnackbar(true)
    setSelectedCourses([])
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackbar(false)
  }

  const courses = props.courses.map(course => <Card key={course.name} 
                                                    course={course}
                                                    handleCourseSelected={handleCourseSelected}
                                                    handleCourseRemoved={handleCourseRemoved}/>)

  return(
    <div>
      <Grid container>
        <Grid item>
          { selectedCourses.length !== 0 &&
            <Tooltip title="Add to cart">
              <Fab className={classes.button} onClick={handleAddToCart}>
                <AddShoppingCartIcon />
              </Fab>
            </Tooltip>
          } 
        </Grid>
        <Grid item xs={11}>
          {courses}
        </Grid>
      </Grid>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <MuiAlert onClose={handleCloseSnackbar} severity="success" elevation={6} variant="filled">
          Courses were added successfully!
        </MuiAlert>
      </Snackbar>
    </div>
  )
}

export default Course