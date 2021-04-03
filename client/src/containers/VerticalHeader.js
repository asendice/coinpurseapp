import React, { useState } from "react";
import { Menu, Icon, Header, Button, Divider, Grid } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions";

const VerticalHeader = (props) => {
  const [menuStyle, setMenuStyle] = useState({
    display: "none",
  });

  const handleToggle = () => {
    let newState = Object.assign({}, menuStyle);
    if (newState.display === "none") {
      newState.display = { display: "flex" };
    }
    if (newState.display === "flex") {
      newState.display = { display: "none" };
    }
    setMenuStyle(newState.display);
  };

  const mobileMenuStyle = {
    display: menuStyle.display,
    margin: 0,
  };

  return (
    <>
      {/* menu display for mobile vp only  */}
      <Grid className="mobile only" style={{ marginTop: "1px" }}>
        <Menu borderless fluid>
          <NavLink exact to="/">
            <Menu.Item link>
              <Header as="h2" onClick={handleToggle}>
                <Icon name="exchange" size="mini" />
                <Header.Content>{props.menuProps.name}</Header.Content>
              </Header>
            </Menu.Item>
          </NavLink>
          <Menu.Menu position="right">
            <Menu.Item>
              <Divider />
              <Button icon toggle onClick={handleToggle}>
                <Icon name="content" />
              </Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Menu borderless vertical fluid style={mobileMenuStyle}>
          <NavLink exact to={`/${props.menuProps.itemOne}`}>
            <Menu.Item link>
              <Header as="h3" onClick={handleToggle}>
                <Icon name="chart line" />
                <Header.Content>{props.menuProps.itemOne}</Header.Content>
              </Header>
            </Menu.Item>
          </NavLink>

          {!props.isLoggedIn ? (
            <NavLink exact to={`${props.menuProps.itemTwo}`}>
              <Menu.Item disabled>
                <Header
                  as="h3"
                  onClick={handleToggle}
                  style={{ color: "grey" }}
                >
                  <Icon name="folder" />
                  <Header.Content>{props.menuProps.itemTwo}</Header.Content>
                </Header>
              </Menu.Item>
            </NavLink>
          ) : (
            <NavLink exact to={`${props.menuProps.itemTwo}`}>
              <Menu.Item link>
                <Header as="h3" onClick={handleToggle}>
                  <Icon name="folder" />
                  <Header.Content>{props.menuProps.itemTwo}</Header.Content>
                </Header>
              </Menu.Item>
            </NavLink>
          )}
          {!props.isLoggedIn ? (
            <NavLink to="/register">
              <Menu.Item>
                <Button onClick={handleToggle}>
                  <Icon name="signup" size="large" color="grey" />
                  Sign Up
                </Button>
              </Menu.Item>
            </NavLink>
          ) : null}
          {!props.isLoggedIn ? (
            <NavLink to="/login">
              <Menu.Item>
                <Button onClick={handleToggle}>
                  <Icon name="sign in" size="large" color="grey" />
                  Log In
                </Button>
              </Menu.Item>
            </NavLink>
          ) : (
            <NavLink to="/">
              <Menu.Item>
                <Button onClick={() => props.logout()}>
                  <Icon name="log out" size="large" color="grey" />
                  Sign Out
                </Button>
              </Menu.Item>
            </NavLink>
          )}
        </Menu>
      </Grid>
      {/* ^^ menu display for movile vp only  */}

      {/* menu display for tablet vp only */}
      <Grid className="tablet only">
        <Grid.Column>
          <Menu
            vertical
            borderless
            fixed="top"
            style={{ height: "100vh", backgroundColor: "#fff" }}
            compact
          >
            <NavLink exact to="/">
              <Menu.Item>
                <Header as="h3">
                  <Icon name="exchange" size="large" />
                </Header>
              </Menu.Item>
            </NavLink>
            <NavLink exact to="/market">
              <Menu.Item>
                <Header>
                  <Icon name="chart line" size="large" />
                </Header>
              </Menu.Item>
            </NavLink>

            {!props.isLoggedIn ? (
              <NavLink exact to="/portfolio">
                <Menu.Item disabled>
                  <Header>
                    <Icon
                      name="folder"
                      size="large"
                      style={{ color: "grey" }}
                    />
                  </Header>
                </Menu.Item>
              </NavLink>
            ) : (
              <NavLink exact to="/portfolio">
                <Menu.Item>
                  <Header>
                    <Icon name="folder" size="large" />
                  </Header>
                </Menu.Item>
              </NavLink>
            )}
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />

            {!props.isLoggedIn ? (
              <NavLink exact to="/register">
                <Menu.Item>
                  <Header>
                    <Icon name="signup" size="large" color="grey" />
                  </Header>
                </Menu.Item>
              </NavLink>
            ) : null}

            {!props.isLoggedIn ? (
              <NavLink exact to="/login">
                <Menu.Item>
                  <Header>
                    <Icon name="sign in" size="large" color="grey" />
                  </Header>
                </Menu.Item>
              </NavLink>
            ) : null}

            {props.isLoggedIn ? (
              <NavLink to="/">
                <Menu.Item style={{ position: "fixed", bottom: 50 }}>
                  <Icon
                    name="log out"
                    size="large"
                    color="grey"
                    onClick={() => props.logout()}
                  />
                </Menu.Item>
              </NavLink>
            ) : null}
          </Menu>
        </Grid.Column>
      </Grid>
      {/* menu display for tablet vp only */}

      {/* view for computer vertical menu  */}
      <Grid className="computer only">
        <Grid.Column>
          <Menu
            size="small"
            attached
            vertical
            borderless
            fixed="top"
            style={{ height: "100vh", background: "#fff" }}
          >
            <NavLink exact to="/">
              <Menu.Item link>
                <Header as="h2">
                  <Header.Content>{props.menuProps.name}</Header.Content>
                </Header>
              </Menu.Item>
            </NavLink>
            <NavLink exact to={`/${props.menuProps.itemOne}`}>
              <Menu.Item link>
                <Header as="h3">
                  <Icon name="chart line" />
                  <Header.Content>{props.menuProps.itemOne}</Header.Content>
                </Header>
              </Menu.Item>
            </NavLink>

            {!props.isLoggedIn ? (
              <Menu.Item disabled>
                <Header as="h3" color="grey">
                  <Icon color="grey" name="folder" />
                  <Header.Content>{props.menuProps.itemTwo}</Header.Content>
                </Header>
              </Menu.Item>
            ) : (
              <NavLink exact to={`/${props.menuProps.itemTwo}`}>
                <Menu.Item link>
                  <Header as="h3">
                    <Icon name="folder" />
                    <Header.Content>{props.menuProps.itemTwo}</Header.Content>
                  </Header>
                </Menu.Item>
              </NavLink>
            )}

            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />

            {!props.isLoggedIn ? (
              <NavLink to="/register">
                <Menu.Item>
                  <Button fluid>
                    <Icon name="signup" size="large" color="grey" />
                    Sign Up
                  </Button>
                </Menu.Item>
              </NavLink>
            ) : null}

            {!props.isLoggedIn ? (
              <NavLink to="/login">
                <Menu.Item>
                  <Button fluid>
                    <Icon name="sign in" size="large" color="grey" />
                    Log In
                  </Button>
                </Menu.Item>
              </NavLink>
            ) : null}

            {props.isLoggedIn ? (
              <NavLink to="/">
                <Menu.Item style={{ position: "fixed", bottom: 50 }}>
                  <Button fluid onClick={() => props.logout()}>
                    <Icon name="log out" size="large" color="grey" />
                    Sign Out
                  </Button>
                </Menu.Item>
              </NavLink>
            ) : null}
          </Menu>
        </Grid.Column>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo.user,
    isLoggedIn: state.userInfo.loggedIn,
  };
};

const mapDispatchToProps = {
  logout: () => logout(),
};

export default connect(mapStateToProps, mapDispatchToProps)(VerticalHeader);
