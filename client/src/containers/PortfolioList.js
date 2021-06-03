import React, { useEffect } from "react";
import {
  roundComma,
  renderArrow,
  rounder,
  ifNegative,
} from "../utils/Helper";
import { Segment, Header, Card, Image, Icon, Divider } from "semantic-ui-react";
import { coinSelect, getTransactions, getMarket } from "../actions";
import { connect } from "react-redux";

const PortfolioList = (props) => {


  const GetData = () => {
    const { getMarket, getTransactions } = props;
    useEffect(() => {
      getMarket();
      getTransactions(props.userId);
    }, [getMarket, getTransactions, props.open]);
  };

  GetData();

  // set the selected coin when you click and opens modal
  const onCoinClick = (coin) => {
    props.coinSelect(coin);
    props.setOpen(true);
  };

  const renderCard = () => {
    // returns an array of names from portfolio array of objects
    const mapNameTrans = props.portfolio.map((coin) => {
      return coin.name;
    });

    // renders array based on filtering through the market object array for any names in the mapNameTrans array
    const filterMarket = props.market.filter((coin) => {
      if (mapNameTrans.includes(coin.name)) {
        return coin;
      } else {
        return null;
      }
    });

    //maps over arr1, searches through arr2 and spreads the array out if any of the object.names are the same and then spreads the objects of arr1
    const mergeByName = (arr1, arr2) =>
      arr1.map((itm) => ({
        ...arr2.find((item) => item.name === itm.name && item),
        ...itm,
      }));

    // merges filterMarket and Portfolio together
    const upToDatePortfolio = mergeByName(filterMarket, props.portfolio);

    // sort the array of objects based on total largest to smallest
    const portSorted = upToDatePortfolio.sort((a, b) => {
      return b.total - a.total;
    });

    if (props.portfolio.length > 0) {
      return portSorted.map((coin) => {
        const dollarGain = coin.amt * coin.current_price - coin.total;
        console.log(roundComma(dollarGain), "dollarGain")
        if (coin.amt === 0) {
          return null;
        } else {
          return (
            <Card
              key={coin.name}
              onClick={() => onCoinClick(coin)}
              raised
              centered
              style={{ margin: "10px" }}
            >
              <Card.Content>
                <Image floated="right" avatar src={coin.image} />
                <Card.Header>{coin.name}</Card.Header>
                <Card.Meta>{coin.symbol}</Card.Meta>
                <Card.Description>
                  <div>{rounder(coin.amt)}</div>
                  <div>{`$${roundComma(coin.amt * coin.current_price)}`}</div>
                  <span
                    style={{
                      color:
                        dollarGain === 0
                          ? "grey"
                          : dollarGain > 0
                          ? "green"
                          : "red",
                    }}
                  >
                    {renderArrow(dollarGain)}
                    {`${ifNegative(roundComma(dollarGain))}`}
                  </span>
                </Card.Description>
              </Card.Content>
            </Card>
          );
        }
      });
    } else {
      return (
        <Segment basic key={0}>
          <span style={{ color: "grey" }}>
            {" "}
            {`Username currently has ${props.portfolio.length} coins. Go to `}{" "}
            <a href="/market">Market</a> to add some transactions!
            <Icon name="cart" />
          </span>
        </Segment>
      );
    }
  };
  return (
    <Segment basic key={1}>
      <Header as="h2">{props.header}</Header>
      <Divider />
      <Card.Group centered>{renderCard()}</Card.Group>
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    market: state.market,
    transactions: state.transactions,
    portfolio: state.portfolio.list,
    userInfo: state.userInfo.user,
    isLoggedIn: state.userInfo.loggedIn,
    userId: state.userInfo.user.data.message._id
  };
};

const mapDispatchToProps = {
  coinSelect: (coin) => coinSelect(coin),
  getMarket: () => getMarket(),
  getTransactions: (userId) => getTransactions(userId),
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioList);
