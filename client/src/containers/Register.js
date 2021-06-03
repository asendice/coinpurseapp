import React, { useState } from "react";
import {
  Container,
  Segment,
  Grid,
  Header,
  Divider,
  Modal,
  Button,
} from "semantic-ui-react";
import RegisterForm from "./RegisterForm";
import { copyRight } from "../utils/Helper";
import { connect } from "react-redux";
import { register } from "../actions";

const Register = (props) => {
  const [open, setOpen] = useState(false);

  // pass formValues to register action creator and open modal
  const onFormSubmit = (values) => {
    props.register(values);
    setOpen(true);
  };

  const renderModalInfo = () => {
    if (props.registerInfo.status === 200) {
      return (
        <>
          <Modal.Header>
            "{props.registerInfo.data.result.name}" has successfully registered
            to Coinpurse!
          </Modal.Header>
          <Modal.Content>
            <Button href="/login" color="green" style={{ float: "right" }}>
              Login
            </Button>
            <Divider hidden />
          </Modal.Content>
        </>
      );
    } else if (props.registerInfo.status === 422) {
      const mapRegInfo = props.registerInfo.data.errors.map((errors) => {
        return errors.user || errors.password || errors.email;
      });
      return (
        <>
          <Modal.Header>
            Failed to register your account because {mapRegInfo}...
          </Modal.Header>
          <Modal.Content>
            <Button href="/register" color="orange" style={{ float: "right" }}>
              Try Again
            </Button>
            <Divider hidden />
          </Modal.Content>
        </>
      );
    } else {
      return <>{null}</>;
    }
  };

  return (
    <>
      <Container style={{ minHeight: 860 }}>
        <Grid columns={3}>
          <Grid.Column computer={2}></Grid.Column>
          <Grid.Column computer={12} tablet={16}>
            <Segment padded="very">
              <Segment basic textAlign="center">
                <Header as="h1">Join Now -- It's Free & Easy!</Header>
              </Segment>
              <RegisterForm onFormSubmit={onFormSubmit} />
              <Segment basic textAlign="center">
                <Header as="h4">
                  Already Have An Account?{" "}
                  <a href="/login">Log In! Let's Go!</a>
                </Header>
              </Segment>
            </Segment>
            <Divider hidden />
            <Divider hidden />
          </Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid>
      </Container>
      <Divider />
      <Segment basic textAlign="center">
        {copyRight()}
      </Segment>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size="small"
        centered={false}
      >
        {renderModalInfo()}
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    registerInfo: state.registerInfo,
  };
};

const mapDispatchToProps = {
  register: (formValues) => register(formValues),
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
