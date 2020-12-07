import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Danielle from './images/Danielle.jpg'
import Nikole from './images/Nikole.jpg'
import Shiraz from './images/Shiraz.jpg'
import ProfileServer from './server/ProfileServer'
import { format } from "date-fns"
import { useUser } from './UserContext'

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
    const [pictures] = useState([
        { name: "Danielle", img: Danielle },
        { name: "Nikole", img: Nikole },
        { name: "Shiraz", img: Shiraz }
    ])
    const [img, setImg] = useState("")
    const user = useUser()

    useEffect(() => {
        async function getUser() {
            // const person = await ProfileServer.getUser(user)

            // if (typeof person === 'string') {
            //     setError('Failed to load user')
            // } else {
                const birthday = format(new Date(user.birthday.substring(0, 10)), "dd.MM.yyyy")
                const person = {
                    ...user,
                    birthday: birthday
                }
    
                setPerson(person)

                const name = user.name.split(' ')[0]
                setImg(pictures.filter(picture => picture.name === name))
                console.log(img)
            //}
        }
        getUser()  
    }, [user, pictures]) 

    return(
        <Box display="flex" justifyContent="center">
            <Card className={classes.root} variant="outlined">
            <CardActionArea>
                <Box display="flex" justifyContent="center">
                    { img.length !== 0 && <Avatar src={img[0].img} className={classes.large}/>}
                </Box>
                <CardContent>
                <Typography gutterBottom variant="h4" component="h2">
                    {person && person.name}
                </Typography>
                <Typography color="textSecondary">
                    {person && "Personal number: " + person.pernum}
                </Typography>
                <Typography color="textSecondary">
                    {person && "Rank: " + person.rank}
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