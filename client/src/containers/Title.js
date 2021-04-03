import React from "react";
import SearchBar from "../components/SearchBar";
import { Header, Grid, Divider, Icon, Popup } from "semantic-ui-react";
import { connect } from "react-redux";

const Title = (props) => {
  return (
    <>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Header as="h1">{props.label}</Header>
          </Grid.Column>
          <Grid.Column>
            {props.userNameDisplay && props.userInfo ? (
              <Header as="h3" floated="right">
                <Icon name="user outline" />
                {props.userInfo.data.message.name}{" "}
              </Header>
            ) : null}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column
            textAlign="right"
            style={{ display: props.searchBarDisplay }}
          > {props.popupDisplay ? (
            <Popup
              content={props.popupContent}
              trigger={<Icon  color="grey" name="info circle" />}
             />
          ) : null}
            {props.searchBarDisplay ? (
              <SearchBar
                label={` Search ${props.label}...`}
                term={props.term}
                onTermSubmit={props.onTermSubmit}
              />
            ) : null}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider hidden />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo.user,
    isLoggedIn: state.userInfo.loggedIn,
  };
};

export default connect(mapStateToProps, null)(Title);
