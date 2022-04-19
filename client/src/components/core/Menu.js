import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography'
import Library from '@material-ui/icons/LocalLibrary'
import Button from '@material-ui/core/Button'
import auth from './../auth/auth-helper'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import logo from '../../assets/images/logo.png';


const isActive = (location, path) => {
  if (location.pathname == path)
    return {color: '#fff'}
  else
    return {color: '#D0D0D0'}
}
const isPartActive = (location, path) => {
  if (location.pathname.includes(path))
    return {color: '#fffde7', backgroundColor: '#f57c00', marginRight:10, textDecoration: 'none'}
  else
    return {color: '#616161', backgroundColor: '#fffde7', border:'1px solid #f57c00', marginRight:10, textDecoration: 'none'}
}

const useStyles = makeStyles({
  app: {
    backgroundColor: 'gray'
  }
})


const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();

  return (
  <AppBar position="fixed" style={{zIndex:12343455}} className={classes.app}>
    <Toolbar >
      <Link to="/" style={{textDecoration: 'none'}}>
        <img style={{marginRight:'10px'}} width="30" height="30" alt="logo" src={logo}/>
      </Link>
      <Typography variant="h6" color="inherit">
        {" Edtech platform"}
      </Typography>
      
      <div style={{'position':'absolute', 'right': '10px'}}><span style={{'float': 'right'}}>
      {
        !auth.isAuthenticated() && (<span>
          <Link to="/signup" style={{textDecoration: 'none'}}>
            <Button style={isActive(location, "/signup")}>Sign up
            </Button>
          </Link>
          <Link to="/signin" style={{textDecoration: 'none'}}>
            <Button style={isActive(location, "/signin")}>Sign In
            </Button>
          </Link>
        </span>)
      }
      {
        auth.isAuthenticated() && (<span>
          {auth.isAuthenticated().user.educator && (<Link to="/teach/courses"><Button style={isPartActive(location, "/teach/")} ><Library/> Teach</Button></Link>)}
          <Link to={"/user/" + auth.isAuthenticated().user._id} style={{textDecoration: 'none'}}>
            <Button style={isActive(location, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
          </Link>
          <Button color="inherit" onClick={() => {
              auth.clearJWT(() => navigate('/'))
            }}>Sign out</Button>
        </span>)
      }
      </span></div>
    </Toolbar>
  </AppBar>
  )
}

export default Menu
