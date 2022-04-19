import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import {listPublished} from '../course/api-course'
import {listEnrolled, listCompleted} from '../enrollment/api-enrollment'
import Typography from '@material-ui/core/Typography'
import auth from '../auth/auth-helper'
import Courses from '../course/Courses'
import Enrollments from '../enrollment/Enrollments'


const useStyles = makeStyles(theme => ({
  card: {
    width:'90%',
    margin: 'auto',
    marginTop: 20,
    marginBottom: theme.spacing(2),
    padding: 20,
    backgroundColor: '#ffffff' 
  },
  extraTop: {
    marginTop: theme.spacing(12)
  },
  
  
  enrolledCard: {
    backgroundColor: '#616161',
  },
  divider: {
    marginBottom: 16,
    backgroundColor: 'rgb(157, 157, 157)'
  },
  noTitle: {
    color: 'lightgrey',
    marginBottom: 12,
    marginLeft: 8
  }
}))

export default function Home(){
  const classes = useStyles()
  const jwt = auth.isAuthenticated()
  const [courses, setCourses] = useState([])
  const [enrolled, setEnrolled] = useState([])
  
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    listEnrolled({t: jwt.token}, signal).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setEnrolled(data)
      }
    })
    return function cleanup(){
      abortController.abort()
    }
  }, [])
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    listPublished(signal).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setCourses(data)
      }
    })
    return function cleanup(){
      abortController.abort()
    }
  }, []);


    return (
    <div className={classes.extraTop}>
      {auth.isAuthenticated().user && (<>
      <Grid container className={classes.card}>
        <Grid item xs={12}>
          <Typography variant="h6" component="h2" className={classes.enrolledTitle}>
            Courses you are enrolled in 
          </Typography>  
          <Divider className={classes.divider}/>
        </Grid>
        <Grid item xs={12}>
          {/* <Enrollments enrollments={[{},{}]}/> */}
          {enrolled.length != 0 ? (<Enrollments enrollments={enrolled}/>)
          : (<Typography variant="body1" className={classes.noTitle}>No courses.</Typography>)
          }
        </Grid>
      </Grid>
      </>
      )}

    <Grid container className={classes.card}>
      <Grid item xs={12}>
        <Typography variant="h5" component="h2">
            All Courses
        </Typography>  
        <Divider className={classes.divider}/>
      </Grid>

      <Grid item xs={12}>
        {/* <Courses courses={[{}, {}, {}, {}, {},{}]} common={[{}]}/> */}
        {(courses.length != 0 && courses.length != enrolled.length) ? (<Courses courses={courses} common={enrolled}/>) 
        : (<Typography variant="body1" className={classes.noTitle}>No new courses.</Typography>)
        }
      </Grid>
    </Grid>
    </div>
    )
}

