import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Button from '@mui/material/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import auth from './../auth/auth-helper';
import { listByInstructor } from './api-course.js';
import { Navigate, Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(12),
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(
      1
    )}px`,
    color: theme.palette.protectedTitle,
    fontSize: '1.2em',
  },
  addButton: {
    float: 'right',
  },
  leftIcon: {
    marginRight: '8px',
  },
  avatar: {
    borderRadius: '3px',
    width: '100px',
    height: 'auto',
    maxWidth: '30',
    maxHeight: '30',
    margin: '15px',
  },
  listText: {
    marginLeft: 16,
  },
}));

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 150) : text}
      <span
        onClick={toggleReadMore}
        className="read-or-hide"
        style={{ color: 'blue', cursor: 'pointer' }}
      >
        {isReadMore ? '...read more' : ' show less'}
      </span>
    </p>
  );
};

export default function MyCourses() {
  const classes = useStyles();
  const [courses, setCourses] = useState([]);
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    listByInstructor(
      {
        userId: jwt.user._id,
      },
      { t: jwt.token },
      signal
    ).then((data) => {
      console.log(data);
      if (data.error) {
        setRedirectToSignin(true);
      } else {
        setCourses(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  if (redirectToSignin) {
    return <Navigate to="/signin" />;
  }
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Your Courses
          <span className={classes.addButton}>
            <Button
              color="primary"
              variant="contained"
              component={Link}
              to="/teach/course/new"
            >
              <AddIcon className={classes.leftIcon}>add_box</AddIcon> New Course
            </Button>
          </span>
        </Typography>

        <List dense>
          {courses.map((course, i) => {
            return (
              <>
                <ListItem button key={i}>
                  <Link to={'/teach/course/' + course._id} key={i} style={{textDecoration: 'none'}}>
                  <ListItemAvatar>
                    <Avatar
                      src={"/api/courses/photo/" + course._id}

                      className={classes.avatar}
                    />
                  </ListItemAvatar>
                  </Link>
                  <ListItemText
                    primary={
                      <Typography
                        gutterBottom
                        variant="h6"
                        type="body2"
                        style={{
                          color: 'black',
                          fontFamily: 'Times New Roman,Times,serif',
                        }}
                      >
                        {course.name}
                      </Typography>
                    }
                    secondary={<ReadMore>{course.description}</ReadMore>}
                    className={classes.listText}
                  />
                </ListItem>
                <Divider />
                </>
            );
          })}
        </List>
      </Paper>
    </div>
  );
}
