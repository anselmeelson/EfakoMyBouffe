import { createMuiTheme, CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import Restaurants from './pages/Restaurants/Restaurants';
import Produits from './pages/Produits/Produits';
import RestaurantBy from './pages/Restaurants/RestaurantBy';
import Category from './pages/Category/Category';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: '#f4f5fd'
    }
  },
  overrides: {
    MuiAppBar: {
      root: { transform: 'translateZ(0)' }
    }
  },
  props: {
    MuiIconButton: {
      disableRipple: true
    }
  }
})

const useStyles = makeStyles(theme => ({
  appMain: {
    //paddingLeft: '320px',
    width: '100%'
  },
  container: {
    display: "flex",
  }
}));

function App() {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleCloseSideMenu = (e) => {
    setOpen(false)
  }
  
  const handleToggleSideMenu = (e) => {
    setOpen(!open);
  }
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.container}>
        <Router>
          <SideMenu open={open} setOpen={handleCloseSideMenu} />
          <div className={classes.appMain}>

            <Header setOpen={handleToggleSideMenu} />
            <Route path="/restaurant/:id" component={RestaurantBy} />
            <Route path="/restaurant" component={Restaurants} />
            <Route path="/produits" component={Produits} />
            <Route path="/category" component={Category} />

          </div>
        </Router>
        <CssBaseline />
      </div>
    </ThemeProvider>
  );
}

export default App;
