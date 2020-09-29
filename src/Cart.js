import React, {useCallback, useState} from 'react'
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
import ShopOutlinedIcon from '@material-ui/icons/ShopOutlined'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import Tooltip from '@material-ui/core/Tooltip'
import {useCart, useCartRemove, useCartClear} from './CartContext'

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
    //const [openSnackbar, setOpenSnackbar] = useState(false)
    const [openMessage, setOpenMessage] = useState(false)
    const cart = useCart()
    const removeCart = useCartRemove()
    const clearCart = useCartClear()

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
            window.setTimeout(() => {
              setLoading(false)
              clearCart()
              setOpenMessage(true)
              window.setTimeout(() => {
                handleClose()
              }, 3000)
            }, 2000)
        }
    }

    return(
        <div>
            <Fab className={classes.cartButton} onClick={openCart} color="secondary" aria-label="Shopping cart">
                <ShoppingCartOutlinedIcon />
            </Fab>
            <Dialog open={open} onClose={handleClose} aria-labelledby="simple-dialog-title">
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
                                <ListItemText primary={item.name} secondary={item.date}/>
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
                            {/* <Tooltip title="Order"> */}
                                <IconButton onClick={() => orderCourses()}>
                                    <ShopOutlinedIcon style={{fontSize: 45, color: '#000000'}} />
                                </IconButton>
                            {/* </Tooltip> */}
                        </Typography>
                    }
                    { openMessage &&
                        <Typography variant="h6">
                            You signed up for courses :)
                        </Typography>
                    }
                    {/* <Snackbar open={openSnackbar} autoHideDuration={2000}>
                        <MuiAlert severity="success" elevation={6} variant="filled">
                            You signed up for courses :)
                        </MuiAlert>
                    </Snackbar> */}
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Cart