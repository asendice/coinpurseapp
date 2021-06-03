import React, { useState, useEffect } from "react";
import { Segment, Label, Popup, Icon, Header } from "semantic-ui-react";
import Title from "./Title";
import SearchNotFound from "../components/SearchNotFound";
import { roundComma, readableDate } from "../utils/Helper";
import { getTransactions } from "../actions";
import { connect } from "react-redux";

const TransactionHistory = (props) => {
  const [term, setTerm] = useState("");

  const GetTransData = () => {
    const { getTransactions } = props;
    useEffect(() => {
      getTransactions(props.userId);
    }, [getTransactions]);
  };
  GetTransData();

  const onTermSubmit = (term) => {
    setTerm(term);
  };

  // filters the transaction object array .name .symbol .date by search term
  const filterTransactionsByTerm = props.transactions.transactions.filter(
    (trans) => {
      if (
        trans.name.toLowerCase().includes(term.toLowerCase()) ||
        trans.symbol.toLowerCase().includes(term.toLowerCase()) ||
        trans.date.includes(term)
      ) {
        return trans;
      } else {
        return null;
      }
    }
  );

  // sorts the transaction array to display most recent to least recent
  const sortTrans = filterTransactionsByTerm.sort((a, b) => {
    const one = new Date(a.createdAt);
    const two = new Date(b.createdAt);
    return two - one;
  });

  // if the transaction array contains no transactions render Search Not Found component
  const renderNotFound = () => {
    if (sortTrans.length === 0) {
      return (
        <div key="nf">
          <SearchNotFound
            term={term}
            nf="Zero Transactions Found..."
            loading="No Transaction History Yet..."
          />
        </div>
      );
    } else {
      return null;
    }
  };

  const renderTransactions = () => {
    if (props.transactions.transactions.length > 0) {
      return sortTrans.map((trans) => {
        const date = new Date(trans.createdAt);
        return (
          <tr key={trans._id}>
            <td>
              <Label>
                {/* <div>{trans.date}</div>
                <div>{trans.time}</div> */}
                {readableDate(date.toString())}
              </Label>
            </td>
            <td>
              <img
                className="ui image avatar"
                src={trans.image}
                alt={trans.id}
              />
            </td>
            <td className="td-dis">{trans.name}</td>
            <td>
              {trans.buy ? (
                <Header as="h4" style={{ color: "green" }}>
                  {trans.amt}
                </Header>
              ) : (
                <Header as="h4" style={{ color: "red" }}>
                  {trans.amt}
                </Header>
              )}
            </td>
            <td>{`$${roundComma(trans.price)}`}</td>
            <td className="td-dis">{`$${roundComma(
              Number(trans.amt * trans.price)
            )}`}</td>
            <td>
              {trans.note ? (
                <Popup
                  content={trans.note}
                  position="top center"
                  trigger={<Icon name="clipboard" style={{ color: "grey" }} />}
                />
              ) : (
                <Icon />
              )}
            </td>
          </tr>
        );
      });
    } else {
      return null;
    }
  };

  return (
    <>
      <Segment basic style={{ minHeight: 900 }}>
        <Title
          term={term}
          onTermSubmit={onTermSubmit}
          label="Transaction History"
          userNameDisplay={false}
          searchBarDisplay={true}
          popupContent="Search by name ('Bitcoin'), symbol ('btc'), or date ('5-29-2020')."
          popupDisplay={true}
        />
        <table className="ui unstackable table">
          <thead>
            <tr>
              <th className="two wide">Date / Time</th>
              <th></th>
              <th className="td-dis">Name</th>
              <th>Qty</th>
              <th>Price</th>
              <th className="td-dis">Total</th>
              <th className="one wide">Notes</th>
            </tr>
          </thead>
          <tbody>{renderTransactions()}</tbody>
        </table>
        {renderNotFound()}
      </Segment>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    transactions: state.transactions,
    userInfo: state.userInfo.user,
    isLoggedIn: state.userInfo.loggedIn,
    userId: state.userInfo.user.data.message._id,
  };
};

const mapDispatchToProps = {
  getTransactions: (userId) => getTransactions(userId),
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionHistory);
