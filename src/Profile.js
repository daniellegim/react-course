import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'

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

    useEffect(() => {
        fetch("https://api.mocki.io/v1/c3b8d833")
        .then(response => response.json())
        .then(data => {
            const person = data.filter(person => person.personalNum === "8670224")
            setPerson(person[0])
        })
    }, []) 

    return(
        <Box display="flex" justifyContent="center">
            <Card className={classes.root} variant="outlined">
            <CardActionArea>
                <Box display="flex" justifyContent="center">
                    <Avatar alt="Danielle Gimpel" src="/images/Danielle.JPG" className={classes.large}/>
                </Box>
                <CardContent>
                <Typography gutterBottom variant="h4" component="h2">
                    {person && person.name}
                </Typography>
                <Typography color="textSecondary">
                    {person && "Personal number: " + person.personalNum}
                </Typography>
                <Typography color="textSecondary">
                    {person && "Birthday: " + person.birthday}
                </Typography>
                <Typography color="textSecondary">
                    {person && "Status: " + person.status}
                </Typography>
                </CardContent>
            </CardActionArea>
            </Card>
        </Box>
    )
}

export default Profile