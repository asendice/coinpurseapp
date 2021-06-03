import React from "react";
import { connect } from "react-redux";
import { Divider, Label } from "semantic-ui-react";
import { Form } from "semantic-ui-react";
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
// validator to to let user know this field is required
const required = (x) => {
  if (!x || x === "") {
    return <span style={{ color: "red" }}>*This field is required.</span>;
  }
  return undefined;
};
// validator to to let user know this field can only contain alpha numeric values a-z, A-Z, 0-9
const alphaNumeric = (value) =>
  value && /[^a-zA-Z0-9 ]/i.test(value) ? (
    <span style={{ color: "red" }}> *Only alphanumeric characters</span>
  ) : undefined;

// validator to to let user know this field's length needs to be more than 4 characters
const length = (value) =>
  value && value.length < 4 ? (
    <span style={{ color: "red" }}>
      {`*This field must contain more than 4 characters.`}
    </span>
  ) : undefined;
// validator to to let user know this field's length must be less than 12 characters
const maxLength = (value) =>
  value && value.length > 12 ? (
    <span style={{ color: "red" }}>
      {`*This field must contain no more than 12 characters.`}
    </span>
  ) : undefined;
// value can't include a space " "
const userNameVal = (value) =>
  value && value.includes(" ") ? (
    <span style={{ color: "red" }}>*This field cannot include spaces.</span>
  ) : undefined;

let Login = (props) => {
  return (
    <Form onSubmit={props.handleSubmit(props.onFormSubmit)}>
      <Label>Username</Label>
      <Field
        name="username"
        component={renderInput}
        type="text"
        validate={[required, alphaNumeric, length, maxLength, userNameVal]}
      />
      <Divider hidden />
      <Label>Password</Label>
      <Field
        name="password"
        component={renderInput}
        type="password"
        validate={[required, length, maxLength, userNameVal]}
      />
      <Divider hidden />
      <button
        href="/market"
        type="submit"
        className="ui button massive fluid submit green "
      >
        Log In
      </button>
    </Form>
  );
};

Login = reduxForm({
  form: "login",
})(Login);

const selector = formValueSelector("signin");
Login = connect((state) => {
  const values = selector(state, "username", "password");
  return {
    values,
  };
})(Login);

export default Login;
