import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Danielle from './images/Danielle1.jpg'
import ProfileServer from './server/ProfileServer'
import { format } from "date-fns"

const useStyles = makeStyles((theme) => ({
    root: {
        width: "40%",
        marginTop: "3%"
    },
    large: {
        marginTop: "3%",
        width: 120,
        height: 120
    },
}))

function Profile() {
    const classes = useStyles()

    const [person, setPerson] = useState()
    const [errorMessage, setError] = useState()

    useEffect(() => {
        async function getUser() {
            const person = await ProfileServer.getUser("8670224")

            if (typeof person === 'string') {
                setError('Failed to load user')
            } else {
                const birthday = format(new Date(person.birthday.substring(0, 10)), "dd.MM.yyyy")
                const user = {
                    ...person,
                    birthday: birthday
                }
    
                setPerson(user)
            }
        }
        getUser()  
    }, []) 

    return(
        <Box display="flex" justifyContent="center">
            <Card className={classes.root} variant="outlined">
            <CardActionArea>
                <Box display="flex" justifyContent="center">
                    <Avatar alt="Danielle Gimpel" src={Danielle} className={classes.large}/>
                </Box>
                <CardContent>
                <Typography gutterBottom variant="h4" component="h2">
                    {person && person.name}
                </Typography>
                <Typography color="textSecondary">
                    {person && "Personal number: " + person.persnumber}
                </Typography>
                <Typography color="textSecondary">
                    {person && "Birthday: " + person.birthday}
                </Typography>
                <Typography color="textSecondary">
                    {person && "Status: " + person.quote}
                </Typography>
                {errorMessage !== "" && 
                    <Typography variant="h4" component="h2" align="center" color="error">
                        {errorMessage}
                    </Typography>
                }
                </CardContent>
            </CardActionArea>
            </Card>
        </Box>
    )
}

export default Profile