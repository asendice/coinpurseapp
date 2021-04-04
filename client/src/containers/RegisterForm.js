import React from "react";
import { Form, Divider, Label, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector } from "redux-form";

const renderInput = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => {
  return (
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
};

const required = (x) => {
  if (!x || x === "") {
    return (
      <span style={{ color: "red" }}>
        *This field is required to create your account.
      </span>
    );
  }
  return undefined;
};

const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? (
    <span style={{ color: "red" }}>*Invalid Email address.</span>
  ) : undefined;

const alphaNumeric = (value) =>
  value && /[^a-zA-Z0-9 ]/i.test(value) ? (
    <span style={{ color: "red" }}>
      *This field can only contain alphanumeric characters
    </span>
  ) : undefined;

const length = (value) =>
  value && value.length < 4 ? (
    <span style={{ color: "red" }}>
      *This field must contain more than 4 characters.
    </span>
  ) : undefined;
const maxLength = (value) =>
  value && value.length > 12 ? (
    <span style={{ color: "red" }}>
      *This field must contain no more than 12 characters.
    </span>
  ) : undefined;

const userNameVal = (value) =>
  value && value.includes(" ") ? (
    <span style={{ color: "red" }}>*This field cannot include spaces.</span>
  ) : undefined;

let RegisterForm = (props) => {
  return (
    <Form onSubmit={props.handleSubmit(props.onFormSubmit)}>
      <Label>Username</Label>
      <Field
        type="text"
        name="username"
        component={renderInput}
        placeholder="username"
        validate={[length, userNameVal, maxLength, required, alphaNumeric]}
      />
      <Divider hidden />
      <Label>Email</Label>
      <Field
        name="email"
        component={renderInput}
        type="email"
        validate={[email, required]}
      />
      <Divider hidden />
      <Label>Password</Label>
      <Field
        name="password"
        component={renderInput}
        type="password"
        validate={[length, required, maxLength, userNameVal]}
      />
      <Divider hidden />
      <Label>Confirm Password</Label>
      <Field
        name="confirmPassword"
        component={renderInput}
        type="password"
        validate={[length, required, maxLength, userNameVal]}
      />
      <Divider hidden />
      <Label>Crypto Knowledge </Label>
      <Field name="skill" component="select">
        <option></option>
        <option>new</option>
        <option>novice</option>
        <option>intermediate</option>
        <option>advanced</option>
      </Field>
      <Divider hidden />
      <Button type="submit" color="green" size="massive" fluid>
        Create Your Free Account!
      </Button>
    </Form>
  );
};

RegisterForm = reduxForm({
  form: "register",
})(RegisterForm);

const selector = formValueSelector("signup");
RegisterForm = connect((state) => {
  const values = selector(state, "username", "email", "password", "skill");
  return {
    values,
  };
})(RegisterForm);

export default RegisterForm;
