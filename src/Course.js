import React, {useState} from "react"
import { makeStyles } from '@material-ui/core/styles'
import Card from "./Card"
import Fab from '@material-ui/core/Fab'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Tooltip from '@material-ui/core/Tooltip'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  }
}));

function Course(props) {
  const classes = useStyles()

  const [selectedCourses, setSelectedCourses] = useState([])
  
  const handleCourseSelected = (value) => {
    setSelectedCourses([...selectedCourses, value])
  }

  const handleCourseRemoved = (value) => {
    setSelectedCourses(selectedCourses.filter(course => (course.name !== value.name)))
  }

  const courses = props.courses.map(course => <Card key={course.name} 
                                                    course={course} 
                                                    handleCourseSelected={handleCourseSelected}
                                                    handleCourseRemoved={handleCourseRemoved}/>)

    return(
        <div>
          <Grid container>
            <Grid item>
              { selectedCourses.length !=0 &&
                <Tooltip title="Add to cart">
                  <Fab className={classes.button} aria-label="add">
                    <AddShoppingCartIcon />
                  </Fab>
                </Tooltip>
              } 
            </Grid>
            <Grid item xs={11}>
              {courses}
            </Grid>
          </Grid>
        </div>
    )
}

export default Course