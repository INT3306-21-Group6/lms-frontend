import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import React, { useState, Fragment } from "react";
import {
  Avatar,
  AppBar,
  IconButton,
  Toolbar,
  TextField,
  CssBaseline,
  Paper,
  Box,
  Menu,
  MenuItem,
  Fade,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import SearchBar from "material-ui-search-bar";

import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { green, pink, yellow, blue } from "@material-ui/core/colors";
import Collapse from "@material-ui/core/Collapse";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f5f7fa",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  // title: {
  //   flexGrow: 1,
  // },
  search: {
    backgroundImage: `url(${"https://uploads-us-west-2.insided.com/coursera-en/attachment/0ee512f0-c148-4e6c-a3c5-ae5ea674bbf9_thumb.jpg"})`,
    // backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    padding: 30,
    width: "100%",
    marginBottom: 50,
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    // position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  media: {
    height: 0,
    // paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  appBar: {},
  welcome: {
    color: "#ffffff",
    textColor: "#ffffff",
    fontWeight: 600,
    marginLeft: 300,
  },
  searchBar: {
    width: 500,
    marginBottom: 60,
    marginLeft: 300,
  },
  m1: {
    margin: 8,
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: 15,
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
  green: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
  },
  yellow: {
    color: theme.palette.getContrastText(yellow[500]),
    backgroundColor: yellow[500],
  },
  blue: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
  },
}));

export default function Forum() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const clickOnCard = (id) => {};
  return (
    <Fragment>
      <div className={classes.root}>
        <Box className={classes.search}>
          <br />
          <Typography variant="h4" gutterBottom className={classes.welcome}>
            Welcome to LMS's Forum
          </Typography>
          <SearchBar
            className={classes.searchBar}
            placeholder="Search for your topic"
            // value={this.state.value}
            // onChange={(newValue) => this.setState({ value: newValue })}
            // onRequestSearch={() => doSomethingWith(this.state.value)}
          />
        </Box>
        <Container>
          {/* <AppBar className={classes.appBar}> */}
          <Toolbar>
            <Grid container>
              <Grid item container alignItems="center" xs={6}>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="primary"
                  aria-label="menu"
                  aria-controls="fade-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <ArrowDropDownIcon />
                </IconButton>
                {/* <Button
                  aria-controls="fade-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  Open with fade transition
                </Button> */}
                <Menu
                  id="fade-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                >
                  <MenuItem onClick={handleClose}>Course1</MenuItem>
                  <MenuItem onClick={handleClose}>Course2</MenuItem>
                  <MenuItem onClick={handleClose}>Course3</MenuItem>
                </Menu>
                <Typography variant="h6" color="primary">
                  Courses' Name
                </Typography>
              </Grid>
              <Grid
                item
                container
                alignItems="center"
                justify="flex-start"
                xs={5}
              >
                <IconButton edge="start" color="primary" aria-label="menu">
                  <AddBoxIcon />
                </IconButton>
                <Typography variant="h7" color="primary">
                  Add new topic
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
          {/* </AppBar> */}
        </Container>
        <Container className={classes.root}>
          <Grid container direction="row" spacing={8}>
            <Grid container item xs={8} direction="column" spacing={2}>
              <Grid item>
                <Card className={classes.card} width={1}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016"
                  />
                  <CardMedia className={classes.media} title="Paella dish" />
                  <CardContent onClick={clickOnCard(1)}>
                    <Box fontWeight="fontWeightMedium" m={1}>
                      <Typography variant="h6">
                        The name of topic will be displayed here
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      This impressive paella is a perfect party dish and a fun
                      meal to cook together with your guests. Add 1 cup of
                      frozen peas along with the mussels, if you like.
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <ThumbUpIcon />
                    </IconButton>
                    <Typography variant="caption" gutterTop>
                      1
                    </Typography>
                    <IconButton aria-label="share">
                      <ChatBubbleIcon />
                    </IconButton>
                    <Typography variant="caption" gutterTop>
                      11
                    </Typography>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item>
                <Card className={classes.card} width={1}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016"
                  />
                  <CardMedia className={classes.media} title="Paella dish" />
                  <CardContent onClick={clickOnCard(1)}>
                    <Box fontWeight="fontWeightMedium" m={1}>
                      <Typography variant="h6">
                        The name of topic will be displayed here
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      This impressive paella is a perfect party dish and a fun
                      meal to cook together with your guests. Add 1 cup of
                      frozen peas along with the mussels, if you like.
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <ThumbUpIcon />
                    </IconButton>
                    <Typography variant="caption" gutterTop>
                      1
                    </Typography>
                    <IconButton aria-label="share">
                      <ChatBubbleIcon />
                    </IconButton>
                    <Typography variant="caption" gutterTop>
                      11
                    </Typography>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item>
                <Card className={classes.card} width={1}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016"
                  />
                  <CardMedia className={classes.media} title="Paella dish" />
                  <CardContent onClick={clickOnCard(1)}>
                    <Box fontWeight="fontWeightMedium" m={1}>
                      <Typography variant="h6">
                        The name of topic will be displayed here
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      This impressive paella is a perfect party dish and a fun
                      meal to cook together with your guests. Add 1 cup of
                      frozen peas along with the mussels, if you like.
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <ThumbUpIcon />
                    </IconButton>
                    <Typography variant="caption" gutterTop>
                      1
                    </Typography>
                    <IconButton aria-label="share">
                      <ChatBubbleIcon />
                    </IconButton>
                    <Typography variant="caption" gutterTop>
                      11
                    </Typography>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
            <Grid container item xs={4} direction="column" spacing={2}>
              <Box mb={2} fontWeight="fontWeightMedium">
                Most helpful members
              </Box>
              <Grid
                item
                container
                direction="row"
                spacing={1}
                justify="flex-start"
                alignItems="center"
              >
                <Grid item>
                  <Avatar className={` ${classes.avatar} ${classes.pink}`}>
                    1
                  </Avatar>
                </Grid>
                <Grid item>
                  <Avatar>C</Avatar>
                </Grid>
                <Grid item>
                  <div>
                    <span>User Link</span>
                    <br />
                    <h7>user's point</h7>
                  </div>
                </Grid>
              </Grid>

              <Grid
                item
                container
                direction="row"
                spacing={1}
                justify="flex-start"
                alignItems="center"
              >
                <Grid item>
                  <Avatar className={` ${classes.avatar} ${classes.green}`}>
                    2
                  </Avatar>
                </Grid>
                <Grid item>
                  <Avatar>C</Avatar>
                </Grid>
                <Grid item>
                  <div>
                    <span>User Link</span>
                    <br />
                    <h7>user's point</h7>
                  </div>
                </Grid>
              </Grid>

              <Grid
                item
                container
                direction="row"
                spacing={1}
                justify="flex-start"
                alignItems="center"
              >
                <Grid item>
                  <Avatar className={` ${classes.avatar} ${classes.blue}`}>
                    3
                  </Avatar>
                </Grid>
                <Grid item>
                  <Avatar>C</Avatar>
                </Grid>
                <Grid item>
                  <div>
                    <span>User Link</span>
                    <br />
                    <h7>user's point</h7>
                  </div>
                </Grid>
              </Grid>

              <Grid
                item
                container
                direction="row"
                spacing={1}
                justify="flex-start"
                alignItems="center"
              >
                <Grid item>
                  <Avatar className={` ${classes.avatar} ${classes.yellow}`}>
                    4
                  </Avatar>
                </Grid>
                <Grid item>
                  <Avatar>C</Avatar>
                </Grid>
                <Grid item>
                  <div>
                    <span>User Link</span>
                    <br />
                    <h7>user's point</h7>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Fragment>
  );
}
