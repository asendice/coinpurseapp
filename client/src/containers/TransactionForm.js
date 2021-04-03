import React from "react";
import { date, time } from "../utils/Helper";
import { Divider, Segment, Form, TextArea, Label } from "semantic-ui-react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";

const renderTextArea = ({
  input,
  meta: { touched, error, warning },
}) => {
  return (
    <div>
      <TextArea
        {...input}
        style={{ maxHeight: 60, minHeight: 60 }}
        placeholder="Enter Notes..."
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
};

const renderAmt = ({ input, label, meta: { touched, error, warning } }) => {
  return (
    <div>
      <input {...input} placeholder={label} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
};

const maxLength = (value) =>
  value && value.length > 100 ? (
    <span style={{ color: "red" }}>
      {`*This field must contain no more than 240 characters.`}
    </span>
  ) : undefined;

const required = (num) => {
  if (!num || num === "") {
    return (
      <span style={{ color: "red" }}>
        *This field is required in order to submit a transaction.
      </span>
    );
  }
  return undefined;
};
const number = (value) =>
  value && isNaN(Number(value)) ? (
    <span style={{ color: "red" }}>*This field must only contain numbers.</span>
  ) : undefined;
const notZero = (value) =>
  value && value <= 0 ? (
    <span style={{ color: "red" }}>
      *This field cannot be less than or equal to 0.
    </span>
  ) : undefined;

let TransactionForm = (props) => {
  return (
    <Form onSubmit={props.handleSubmit(props.onFormSubmit)}>
      <Label>Date of trade: {date} </Label>
      <Divider hidden />
      <Label>Time of trade: {time}</Label>
      <Divider hidden />
      <Label>Amount of {props.coin.name}</Label>
      <Field
        type="number"
        name="amt"
        component={renderAmt}
        placeholder="qty"
        validate={[required, number, notZero]}
        warning="Must be a number"
      />
      <Divider hidden />
      <Label>Notes about trade</Label>
      <Field
        name="note"
        component={renderTextArea}
        type="text"
        validate={[maxLength]}
      />
      <Divider hidden />
      <Segment basic textAlign="center">
        <button
          onClick={props.onBuyClick}
          disabled={!props.valid}
          type="submit"
          className="ui inverted button green"
        >
          Buy
        </button>
        <button
          onClick={props.onSellClick}
          disabled={!props.valid}
          type="submit"
          className="ui inverted button red"
        >
          Sell
        </button>
      </Segment>
    </Form>
  );
};

TransactionForm = reduxForm({
  form: "transaction",
})(TransactionForm);

const selector = formValueSelector("transaction");
TransactionForm = connect((state) => {
  const values = selector(state, "amt", "note");
  return {
    values,
  };
})(TransactionForm);

export default TransactionForm;
