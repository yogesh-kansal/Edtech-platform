import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'

import CompletedIcon from '@material-ui/icons/VerifiedUser'
import InProgressIcon from '@material-ui/icons/DonutLarge'
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'

import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardHeader from '@mui/material/CardHeader'


import logo from '../../assets/images/logo.png';

const useStyles = makeStyles(theme => ({
  tile: {
    textAlign: 'center'
  },
  image: {
    height: '100%'
  }, 
  head: {
    '.MuiCardHeader-title': {
      fontSize: '2px'
    }
  },
  link: {
    textDecoration: 'none'
  }
}))

export default function Enrollments(props){
  const classes = useStyles()
    return (
      <Grid container spacing={7}>
          {props.enrollments.map((course, i) => {
            return (        
            <Grid item xs={12} md={3} sm={4}>
              <Link to={`/learn/${course._id}`} className={classes.link}>
              <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                title={course.name}
                subheader={course?.completed ? "Completed" : "In progress"}
                className={classes.head}
                varient="h3;km"
              />
                <CardMedia
                  component="img"
                  alt={course?.course?.name}
                  height="200"
                  //image={logo}
                  src={`/api/courses/photo/'+&{course._id}`}
               />
              
              </Card>
              </Link>

              {/* <GridListTile className={classes.tile} key={i} style={{padding:0}}>
                <Link to={"/course/"+course._id}><img className={classes.image} src={'/api/courses/photo/'+course._id} alt={course.name} /></Link>
                <GridListTileBar className={classes.tileBar}
                  title={<Link to={"/course/"+course._id} className={classes.tileTitle}>{course.name}</Link>}
                  subtitle={<span>{course.category}</span>}
                  actionIcon={
                    <div className={classes.action}>
                    {auth.isAuthenticated() ? <Enroll courseId={course._id}/> : <Link to="/signin">Sign in to Enroll</Link>}
                    </div>
                  }
                />
              </GridListTile> */}
              </Grid>
              )}
          )}
      </Grid>
    //   <div>
    //     <GridList cellHeight={120} className={classes.gridList} cols={4}>
    //       {props.enrollments.map((course, i) => (
    //         <GridListTile key={i} className={classes.tile}>
    //           <Link to={"/learn/"+course._id}><img className={classes.image} src={'/api/courses/photo/'+course.course._id} alt={course.course.name} /></Link>
    //           <GridListTileBar className={classes.tileBar}
    //             title={<Link to={"/learn/"+course._id} className={classes.tileTitle}>{course.course.name}</Link>}
    //             actionIcon={<div className={classes.action}>
    //              {course.completed ? (<CompletedIcon color="secondary"/>)
    //              : (<InProgressIcon className={classes.progress} />)
    //             }</div>}
    //           />
    //         </GridListTile>
    //       ))}
    //     </GridList>
    // </div>
    )
}

