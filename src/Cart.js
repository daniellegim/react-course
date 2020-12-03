import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/Delete'
import PaymentIcon from '@material-ui/icons/Payment'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import CircularProgress from '@material-ui/core/CircularProgress'
import {useCart, useCartRemove, useCartClear} from './CartContext'
import {useSoldierCoursesUpdate} from './SoldierCoursesContext'
import SoldierCoursesServer from './server/SoldierCoursesServer'
import {useUser} from './UserContext'

const useStyles = makeStyles((theme) => ({
    cartButton: {
        margin: theme.spacing(1)
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    title: {
        textAlign: 'center',
    }
  }));

function Cart() {
    const classes = useStyles()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [openMessage, setOpenMessage] = useState(false)
    const cart = useCart()
    const removeCart = useCartRemove()
    const clearCart = useCartClear()
    const updateSoldierCourses = useSoldierCoursesUpdate()
    const user = useUser()

    const openCart = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const removeItem = (value) => {
        removeCart(value)
    }

    const orderCourses = () => {
        if (!loading) {
            setLoading(true)
            window.setTimeout(async () => {
                setLoading(false)

                const newCourses = []

                const coursesToAdd = cart.map(course => ({
                    pernum: user,
                    courseId: course._id,
                    date: new Date(course.dates[0].split(".").reverse().join("-"))
                }))

                // Save each course to DB
                for (let course of coursesToAdd) {
                    const courseAdded = await SoldierCoursesServer.addNewSoldierCourse(course) 

                    if (typeof courseAdded === 'string') {
                        console.log('failed')
                    } else {
                        let newCourse = cart.filter(cartCourse => cartCourse._id === course.courseId)
                        newCourse[0].dates = [courseAdded.date]
                        newCourses.push(newCourse[0])
                    }
                }

                updateSoldierCourses(newCourses)
                clearCart()
                setOpenMessage(true)

                window.setTimeout(() => {
                    handleClose()
                    setOpenMessage(false)
                }, 3000)
            }, 2000)
        }
    }

    return(
        <div>
            <Fab className={classes.cartButton} onClick={openCart} color="secondary" aria-label="Shopping cart">
                <ShoppingCartOutlinedIcon />
            </Fab>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="simple-dialog-title">
                    <Typography className={classes.title} variant="h5">
                        Cart
                    </Typography>
                    <Typography className={classes.title}>
                        {cart.length} {cart.length === 1 ? " product" : " products" }
                    </Typography>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <List>
                        {cart.map((item) => (
                            <ListItem button key={item.name}>
                                <ListItemText primary={item.name} secondary={item.dates[0]}/>
                                <IconButton aria-label="close" onClick={() => removeItem(item.name)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                    { loading &&
                        <Typography className={classes.title}>
                            <CircularProgress color="secondary"/>
                        </Typography>
                    }
                    { cart.length !== 0 &&
                        <Typography className={classes.title}>
                            <Button
                                variant="contained"
                                style={{fontSize: 18, color: 'white', background: '#bc4ef9'}}
                                onClick={() => orderCourses()}
                                endIcon={<PaymentIcon />}
                            >
                                Pay
                            </Button>
                        </Typography>
                    }
                    { openMessage &&
                        <Typography variant="h6">
                            You signed up for courses :)
                        </Typography>
                    }
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Cart