import React from "react"
import Card from "./Card"
import Fab from '@material-ui/core/Fab'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Tooltip from '@material-ui/core/Tooltip'

function Course(props) {
    const courses = props.courses.map(course => <Card course={course}/>)
    return(
        <div>
          <Tooltip title="Add to cart">
            <Fab    aria-label="add">
              <AddShoppingCartIcon />
            </Fab>
          </Tooltip>
            {courses}
        </div>
    )
}

export default Course