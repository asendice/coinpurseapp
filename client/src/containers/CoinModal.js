import React, { useState, useEffect } from "react";
import _ from "lodash";
import {
  Modal,
  Segment,
  Accordion,
  Header,
  Image,
  Grid,
  Button,
  Label,
  Icon,
  Popup,
  Divider,
} from "semantic-ui-react";
import TransactionForm from "./TransactionForm";
import { connect } from "react-redux";
import {
  deleteFavorite,
  postFavorite,
  getFavorites,
  modalInfo,
  postTransaction,
  getTransactions,
  getMarket,
} from "../actions";
import { roundComma, rounder, ifNegative } from "../utils/Helper";

const CoinModal = (props) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [index] = useState(0);
  const [buy, setBuy] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [failedOpen, setFailedOpen] = useState(false);

  useEffect(() => {
    setActiveIndex(1);
    props.getFavorites(props.userId);
    props.modalInfo();
    props.getMarket();
    props.getTransactions(props.userId);
  }, [props.open]);

  if (confirmOpen) {
    setTimeout(() => {
      setConfirmOpen(false);
    }, 2500);
  }

  // cretes an array of strings that have been rounded up
  const values = [
    `$${roundComma(props.selectedCoin.current_price)}`,
    `${roundComma(props.selectedCoin.price_change_percentage_24h)}%`,
    `$${roundComma(props.selectedCoin.market_cap)}`,
    `${roundComma(props.selectedCoin.market_cap_change_percentage_24h)}%`,
    `$${roundComma(props.selectedCoin.ath)}`,
    `$${props.selectedCoin.atl}`,
    `${roundComma(props.selectedCoin.circulating_supply)}`,
    props.selectedCoin.total_supply > 0
      ? `${roundComma(props.selectedCoin.total_supply)}`
      : "Not Available",
  ];

  // toggle for accordion
  const accordionClick = () => {
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const favoriteClick = (coin) => {
    // filter the favorites array by the coin symbol that user click on
    const filterFav = props.favorites.favorites.filter(
      (fav) => fav.symbol === coin.symbol
    );
    // maps over favorites array and returns an array based on if the symbols in favorites array are equal to the selected coin symbol
    const mapFav = props.favorites.favorites.map((fav) => {
      if (fav.symbol === props.selectedCoin.symbol) {
        return false;
      } else {
        return true;
      }
    });
    if (!mapFav.includes(false)) {
      const fav = {
        userId: props.userId,
        symbol: coin.symbol,
      };
      props.postFavorite(fav);
    } else {
      props.deleteFavorite(filterFav[0]._id);
    }
  };

  // return array of names from portfolio object array
  const mapNameTrans = props.portfolio.map((coin) => {
    return coin.name;
  });

  // filters market object array by if the mapNameTrans array includes any of the object.names
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

  // merger filterMarket and portfolio array together
  const upToDatePortfolio = mergeByName(filterMarket, props.portfolio);

  const filterPortList = upToDatePortfolio.filter((coin) => {
    if (coin.name === props.selectedCoin.name) {
      return coin;
    } else {
      return null;
    }
  });

  const onFormSubmit = (values) => {
    const coinAmt = filterPortList.map((coin) => {
      return coin.amt;
    });
    const today = new Date();
    const date =
      today.getMonth() + 1 + "-" + today.getDate() + "-" + today.getFullYear();
    const time =
      (today.getHours() % 12 || 12) +
      ":" +
      (today.getMinutes() < 10 ? "0" : "") +
      today.getMinutes() +
      ":" +
      (today.getSeconds() < 10 ? "0" : "") +
      today.getSeconds();
    // if buy is true or if coinAmt greater than or equal to values.amt
    // prevents the user from being able to sell assets when they don't have enough
    // takes formValues and adds on properties
    if (buy || coinAmt >= Number(values.amt)) {
      values.userId = props.userInfo.data.message._id;
      values.name = props.selectedCoin.name;
      values.symbol = props.selectedCoin.symbol;
      values.buy = buy;
      values.amt = Number(values.amt);
      values.image = props.selectedCoin.image;
      values.price = Number(props.selectedCoin.current_price);
      values.date = date;
      values.time = time;
      props.postTransaction(values);
      setConfirmOpen(true);
      props.setOpen(false);
    } else {
      setFailedOpen(true);
    }
  };

  const onBuyClick = () => {
    setBuy(true);
  };
  const onSellClick = () => {
    setBuy(false);
  };

  const renderLabel = () => {
    const join = _.zip(values, props.info);
    if (join[1][1]) {
      return join.map((stat) => {
        return (
          <Grid.Column key={stat[1]._id}>
            <Popup
              content={stat[1].labelDescription}
              position="right center"
              trigger={
                <Label style={{ cursor: "default" }} color="grey">
                  {stat[1].label}
                </Label>
              }
            />
            <Segment>
              <Header as="h5">{stat[0]}</Header>
            </Segment>
            <Divider hidden />
          </Grid.Column>
        );
      });
    } else {
      return <div>nothing populated</div>;
    }
  };

  const renderPortData = () => {
    if (filterPortList) {
      return filterPortList.map((coin) => {
        const dollarGain = coin.amt * coin.current_price - coin.total;
        if (coin.amt > 0) {
          return (
            <React.Fragment key={coin.name}>
              <Grid.Column>
                <Popup
                  content={`Your remaing amount of ${coin.name} after all transactions, buys and sells, have been calculated.`}
                  position="right center"
                  trigger={
                    <Label style={{ cursor: "default" }} color="grey">
                      Amount of {coin.name} owned
                    </Label>
                  }
                />
                <Segment>
                  <Header as="h5">{rounder(coin.amt)}</Header>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Popup
                  content={`Estimated overall value of your ${coin.name}. Amount of ${coin.name} x Current Price.`}
                  position="right center"
                  trigger={
                    <Label style={{ cursor: "default" }} color="grey">
                      Estimated Value
                    </Label>
                  }
                />
                <Segment>
                  <Header as="h5">
                    ${roundComma(coin.amt * coin.current_price)}
                  </Header>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Popup
                  content={`USD increase/decrease of the total cost of your investment to what your investment is currently worth.`}
                  position="right center"
                  trigger={
                    <Label style={{ cursor: "default" }} color="grey">
                      Gain
                    </Label>
                  }
                />
                <Segment>
                  <Header as="h5">{ifNegative(roundComma(dollarGain))}</Header>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Popup
                  content={`Total USD invested after all buys and sells have been calculated for ${coin.name}`}
                  position="right center"
                  trigger={
                    <Label style={{ cursor: "default" }} color="grey">
                      Total Investment
                    </Label>
                  }
                />
                <Segment>
                  <Header as="h5">${roundComma(coin.total)}</Header>
                </Segment>
              </Grid.Column>
            </React.Fragment>
          );
        } else {
          return null;
        }
      });
    }
  };

  const renderModalHeader = () => {
    const hearts = props.favorites.favorites.map((fav) => {
      return fav.symbol === props.selectedCoin.symbol;
    });
    return (
      <Modal.Header key={props.selectedCoin.id}>
        <Image avatar src={props.selectedCoin.image} />
        {props.selectedCoin.name}
        <span style={{ color: "grey" }}>
          {" " + props.selectedCoin.symbol + " "}
        </span>
        <span>
          <Popup
            content={
              !props.isLoggedIn
                ? "Log in to add favorites."
                : hearts.includes(true)
                ? "Favorited"
                : "Add to Favorites?"
            }
            trigger={
              <Icon
                link
                name={hearts.includes(true) ? "heart" : "heart outline"}
                color={!props.isLoggedIn ? "grey" : "red"}
                onClick={() =>
                  props.isLoggedIn ? favoriteClick(props.selectedCoin) : null
                }
              />
            }
          />
        </span>
        <span style={{ float: "right" }}>
          <Icon
            style={{ cursor: "pointer" }}
            floated="right"
            size="small"
            float="right"
            name="x"
            onClick={() => props.setOpen(false)}
          />
        </span>
      </Modal.Header>
    );
  };

  return (
    <>
      <Modal
        onClose={() => props.setOpen(false)}
        onOpen={() => props.setOpen(true)}
        open={props.open}
        size="large"
        centered={false}
      >
        {renderModalHeader()}
        <Modal.Content>
          <Grid container columns={4} stackable>
            <Grid.Row>{renderLabel()}</Grid.Row>
            <Divider />
            <Grid.Row>{renderPortData()}</Grid.Row>
          </Grid>
        </Modal.Content>
        <Modal.Content>
          <Popup
            content={!props.isLoggedIn ? "Log in to create a portfolio." : null}
            disabled={!props.isLoggedIn ? false : true}
            trigger={
              <Accordion>
                <Accordion.Title
                  onClick={() => (!props.isLoggedIn ? null : accordionClick())}
                  index={index}
                  active={activeIndex === 0}
                  icon={<Icon name={activeIndex === 0 ? "minus" : "plus"} />}
                  content={
                    <Label size="large" color="grey">
                      {activeIndex === 0
                        ? `Enter Transaction Information for ${props.selectedCoin.name}`
                        : "Add Transaction?"}
                    </Label>
                  }
                />
                <Accordion.Content
                  active={activeIndex === 0}
                  content={
                    <TransactionForm
                      coin={props.selectedCoin}
                      onFormSubmit={onFormSubmit}
                      onBuyClick={onBuyClick}
                      onSellClick={onSellClick}
                    />
                  }
                />
              </Accordion>
            }
          />
        </Modal.Content>
      </Modal>
      <Modal
        size="small"
        centered={false}
        onClose={() => setConfirmOpen(false)}
        onOpen={() => setConfirmOpen(true)}
        open={confirmOpen}
      >
        <Modal.Header>
          {buy
            ? `Submitting... "Buy" Transaction for ${props.selectedCoin.name}`
            : `Submitting... "Sell" Transaction for ${props.selectedCoin.name}`}
          <Icon
            name="x"
            onClick={() => setConfirmOpen(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </Modal.Header>
      </Modal>
      <Modal
        centered={false}
        size="small"
        onClose={() => setFailedOpen(false)}
        onOpen={() => setFailedOpen(true)}
        open={failedOpen}
      >
        <Modal.Header>
          {`Transaction cancelled.  Insufficient amount of  ${props.selectedCoin.name}.`}
          <Button
            onClick={() => setFailedOpen(false)}
            color="orange"
            style={{ float: "right" }}
          >
            Try Again
          </Button>
        </Modal.Header>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedCoin: state.selectedCoin,
    info: state.info,
    favorites: state.favorites,
    market: state.market,
    transactions: state.transactions,
    portfolio: state.portfolio.list,
    userInfo: state.userInfo.user,
    isLoggedIn: state.userInfo.loggedIn,
    userId: state.userInfo.user ? state.userInfo.user.data.message._id : "",
  };
};

const mapDispatchToProps = {
  getFavorites: (userId) => getFavorites(userId),
  modalInfo: () => modalInfo(),
  deleteFavorite: (coinId) => deleteFavorite(coinId),
  postFavorite: (coin) => postFavorite(coin),
  postTransaction: (trans) => postTransaction(trans),
  getTransactions: (userId) => getTransactions(userId),
  getMarket: () => getMarket(),
};

export default connect(mapStateToProps, mapDispatchToProps)(CoinModal);
