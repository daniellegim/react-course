import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import ProfileServer from './server/ProfileServer'
import { useHistory } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp() {

    const classes = useStyles()

    const [name, setName] = useState()
    const [pernum, setPernum] = useState()
    const [birthday, setBirthday] = useState()
    const [rank, setRank] = useState()
    const [quote, setQuote] = useState()
    const [message, setMessage] = useState()
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [snackbarColor, setColor] = useState()
    const history = useHistory()

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handlePernumChange = (event) => {
        setPernum(event.target.value)
    }

    const handleBirthdayChange = (event) => {
        setBirthday(event.target.value)
    }

    const handleRankChange = (event) => {
        setRank(event.target.value)
    }

    const handleQuoteChange = (event) => {
        setQuote(event.target.value)
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return
        }
    
        setOpenSnackbar(false)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (name && pernum && birthday && rank && quote) {
            const newUser = {
                name: name,
                pernum: pernum,
                birthday: birthday,
                rank: rank,
                quote: quote
            }
            const user = await ProfileServer.addNewUser(newUser)

            if (typeof user === 'string') {
                setMessage("Failed to add user")
                setOpenSnackbar(true)
                setColor("error")
            } else {
                setMessage("User was added successfully")
                setOpenSnackbar(true)
                setColor("success")
                window.setTimeout(() => {
                    history.push("/")
                }, 2000)
            }
        } else {
            setMessage("Fill all fields")
            setOpenSnackbar(true)
            setColor("error")
        }
    }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                value={name}
                onChange={handleNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                type="number"
                required
                fullWidth
                id="pernum"
                label="Personal number"
                autoComplete="pernum"
                value={pernum}
                onChange={handlePernumChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Birthday"
                type="date"
                id="birthday"
                autoComplete="birthday"
                value={birthday}
                onChange={handleBirthdayChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="rank"
                variant="outlined"
                required
                fullWidth
                id="rank"
                label="Rank"
                value={rank}
                onChange={handleRankChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="quote"
                variant="outlined"
                required
                fullWidth
                id="quote"
                label="Quote"
                value={quote}
                onChange={handleQuoteChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
        <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
            <MuiAlert onClose={handleCloseSnackbar} severity={snackbarColor} elevation={6} variant="filled">
                {message}
            </MuiAlert>
        </Snackbar>
    </Container>
  )
}

export default SignUp