// eslint-disable-next-line react-hooks/exhaustive-deps
import './user.css';
import React, { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import DeleteUser from './DeleteUser';
import auth from './../auth/auth-helper';
import { read } from './api-user.js';
import { Navigate, Link, useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

// const useStyles = makeStyles((theme) => ({
//   root: theme.mixins.gutters({
//     maxWidth: 600,
//     margin: 'auto',
//     padding: theme.spacing(3),
//     marginTop: theme.spacing(12),
//   }),
//   title: {
//     marginTop: theme.spacing(3),
//     color: theme.palette.protectedTitle,
//   },
// }));

export default function Profile({ match }) {
  //const classes = useStyles();
  const [user, setUser] = useState({});

  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const jwt = auth.isAuthenticated();
  const { userId } = useParams();
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read(
      {
        userId,
      },
      { t: jwt.token },
      signal
    ).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true);
      } else {
        console.log(data);
        setUser(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, [userId]);

  if (redirectToSignin) {
    return <Navigate to="/signin" />;
  }
  return (
    <div className="ProfilePage">
      <Container maxWidth="sm">
        <Box sx={{
          marginTop: 13,
        }}>
          <div
            className="clearfix"
            style={{ boxShadow: '0 0 12px 3px rgba(0, 0, 0, 0.08)' }}
          >
            <div className="col-md-4 animated fadeIn">
              <div className="card">
                {/* auth.isAuthenticated().user && auth.isAuthenticated().user._id == user._id && */}

                <div className="card-body">
                  <div
                    className="avatar"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      src="https://picsum.photos/200/200"
                      className="card-img-top"
                      alt="random-image"
                    />
                  </div>
                  <h5 className="card-title">{user?.name}</h5>
                  <p className="card-text">
                    {user?.email}
                    <br />
                    <span className="phone">
                      {'Joined on: ' + new Date(user?.created).toDateString()}
                    </span>
                  </p>

                  <Link to={'/user/edit/' + user?._id}>
                    <IconButton aria-label="Edit" color="primary">
                      <Edit />
                    </IconButton>
                  </Link>
                  <DeleteUser userId={user?._id} />
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Container>
    </div>
  );
}
