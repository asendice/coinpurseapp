import React, { useState } from "react";
import {
  Card,
  Divider,
  Header,
  Icon,
  Segment,
  Container,
  Modal,
} from "semantic-ui-react";
import { copyRight } from "../utils/Helper";
import { Redirect } from "react-router";
import { login } from "../actions";
import LoginForm from "../containers/LoginForm";
import { connect } from "react-redux";
const Login = (props) => {
  const [open, setOpen] = useState(false);
  const onFormSubmit = (formValues) => {
    props.login(formValues);
    setTimeout(() => {
      setOpen(true);
    }, 2000);
  };

  const renderModal = () => {
    if (props.loggedIn) {
      return (
        <>
          <Redirect to="/market" />
        </>
      );
    } else if (!props.loggedIn) {
      const mapUserInfoError = props.userInfo.data.errors.map((errors) => {
        return errors.user || errors.password;
      });
      return (
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          size="small"
          centered={false}
        >
          <Modal.Header>
            Login failed: {mapUserInfoError}
            <Icon
              onClick={() => setOpen(false)}
              name="x"
              style={{ float: "right", cursor: "pointer" }}
            />
          </Modal.Header>
        </Modal>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <Container style={{ minHeight: 840 }}>
        <Segment basic textAlign="center">
          <Header as="h1">
            <Icon name="exchange" />
            coinpurse.app
          </Header>
        </Segment>
        <Card centered>
          <Card.Content>
            <LoginForm onFormSubmit={onFormSubmit} />
            <Divider />
            <Segment basic textAlign="center">
              <Header as="h4">
                New? <a href="/register">Register it's FREE!</a>
              </Header>
            </Segment>
          </Card.Content>
        </Card>
        <Divider hidden />
        <Divider hidden />
      </Container>
      <Segment basic textAlign="center">
        <Divider />
        {copyRight()}
      </Segment>
      {props.userInfo ? renderModal() : null}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo.user,
    loggedIn: state.userInfo.loggedIn,
  };
};

const mapDispatchToProps = {
  login: (formValues) => login(formValues),
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
