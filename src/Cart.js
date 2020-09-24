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

const useStyles = makeStyles((theme) => ({
    button: {
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

    const [open, setOpen] = useState(false);

    const openCart = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return(
        <div>
            <Fab className={classes.button} onClick={openCart} color="secondary" aria-label="Shopping cart">
                <ShoppingCartOutlinedIcon />
            </Fab>
            <Dialog open={open} onClose={handleClose} aria-labelledby="simple-dialog-title">
                <DialogTitle id="simple-dialog-title">
                    <Typography className={classes.title}>
                        Cart
                    </Typography>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                        hi babjkabkascbkdskgvhfvfvhbfjh
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Cart