import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import {Link} from 'react-router-dom'
import auth from './../auth/auth-helper'
import Enroll from './../enrollment/Enroll'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import logo from '../../assets/images/logo.png';


const useStyles = makeStyles(theme => ({
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  },
  media: {
    minHeight: 400
  },
  gridList: {
    width: '100%',
    minHeight: 200,
    padding: '16px 0 0px'
  },
  tile: {
    textAlign: 'center',
    border: '1px solid #cecece',
    backgroundColor:'#04040c'
  },
  image: {
    height: '100%'
  },
  tileBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    textAlign: 'left'
  },
  tileTitle: {
    fontSize:'1.1em',
    marginBottom:'5px',
    color:'#fffde7',
    display:'block'
  },
  action:{
    margin: '0 10px'
  },
  link: {
    textDecoration: "none"
  }
}))

export default function Courses(props){
  const classes = useStyles()
  const findCommon = (course) => {
    return !props.common.find((enrolled)=>{return enrolled.course._id == course._id})
  }
  console.log(props)
    return (
        <Grid container spacing={7}>
          {props.courses.map((course, i) => {
            return (  findCommon(course) &&      
            <Grid item xs={12} md={3} sm={4} key={i}>
              <Card sx={{ maxWidth: 345 }}>
              <Link to={`/course/${1}`} className={classes.link}>
                <CardMedia
                  component="img"
                  alt={course?.name}
                  height="180"
                  image={`/api/courses/photo/'${course._id}`}
                  //image={logo}
               />
               </Link>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {course?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {course?.category}
                </Typography>
              </CardContent>
              <CardActions>
                <Enroll courseId={course._id}/>
               </CardActions>
              </Card>
              </Grid>
              )}
          )}
          </Grid>
    )
}

Courses.propTypes = {
  courses: PropTypes.array.isRequired
}