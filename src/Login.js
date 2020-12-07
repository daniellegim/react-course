import React, { useState } from "react"
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import {useUserUpdate} from './UserContext'
import { useHistory } from "react-router-dom"
import ProfileServer from './server/ProfileServer'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        marginTop: theme.spacing(6),
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
  }))

function Login() {
    const classes = useStyles()

    const [persnum, setPersnum] = useState("")
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const updateUser = useUserUpdate()
    const history = useHistory()

    const handleInputChange = (event) => {
        setPersnum(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const user = await ProfileServer.getUser(persnum)

        if (typeof user === 'string') {
            setOpenSnackbar(true)
        } else {
            updateUser(user)
            history.push("/coursePage")
        }
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return
        }
    
        setOpenSnackbar(false)
    }

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Welcome to courses website!
            </Typography>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <form className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="pernum"
                    label="Personal number"
                    autoComplete="pernum"
                    autoFocus
                    value={persnum}
                    onChange={handleInputChange}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit}
                >
                    Sign In
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link href="/signUp" variant="body2">
                            Don't have an account? Sign Up
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </div>
        <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
            <MuiAlert onClose={handleCloseSnackbar} severity="error" elevation={6} variant="filled">
                User does not exist
            </MuiAlert>
        </Snackbar>
        </Container>
    )
}

export default Login