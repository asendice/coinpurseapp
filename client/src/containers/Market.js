import React, { useState, useEffect } from "react";
import { Segment, Table, Icon, Divider } from "semantic-ui-react";
import { roundComma, convertMc, renderArrow, copyRight } from "../utils/Helper";
import { connect } from "react-redux";
import {
  getMarket,
  coinSelect,
  getFavorites,
  getTransactions,
} from "../actions";
import Title from "../containers/Title";
import SearchNotFound from "../components/SearchNotFound";
import CoinModal from "./CoinModal";

const Market = (props) => {
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState(false);

  // on render and when modal opens get market data and favorites/transaction date by the logged in userId
  useEffect(() => {
    props.getMarket();
    props.getFavorites(props.userId);
    props.getTransactions(props.userId);
  }, [open]);

  // when submitted setTerm to the argument
  const onTermSubmit = (term) => {
    setTerm(term);
  };
  // when table is click open modal and selecting the "selected coin" 
  const onTableRowClick = (coin) => {
    setOpen(true);
    props.coinSelect(coin);
  };
  // renders out an array of coin objects based on if the term string is included in the market's coin's name or symbol
  const filterMarketForTerm = props.market.filter((coin) => {
    if (
      coin.name.toLowerCase().includes(term.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(term.toLowerCase())
    ) {
      return coin;
    } else {
      return null;
    }
  });

  // renders SeatchNotFound component if the length of the filterMarketTerm is 0
  const renderNotFound = () => {
    if (filterMarketForTerm.length === 0) {
      return (
        <div>
          <SearchNotFound
            term={term}
            nf="Zero Results Found..."
            loading="Loading Market..."
          />
        </div>
      );
    } else {
      return null;
    }
  };

  const renderMarket = () => {
    // returns an array of just symbols from favorites array of coin objects
    const mapFavs = props.favorites.favorites.map((fav) => {
      return fav.symbol;
    });
    return filterMarketForTerm.map((coin) => {
      return (
        <Table.Row
          key={coin.id}
          onClick={() => onTableRowClick(coin)}
          className="td-click"
        >
          <Table.Cell className="td-dis">
            <h4>{coin.market_cap_rank}</h4>
          </Table.Cell>
          <Table.Cell>
            <img
              className="ui image avatar"
              src={coin.image}
              alt={coin.image}
            />
          </Table.Cell>
          <Table.Cell>
            <h4>{coin.name}</h4>
          </Table.Cell>
          <Table.Cell>
            <h4>${roundComma(coin.current_price)}</h4>
          </Table.Cell>
          <Table.Cell
            style={{
              color: coin.price_change_percentage_24h >= 0 ? "green" : "red",
            }}
          >
            <h4>
              {renderArrow(coin.price_change_percentage_24h)}
              {roundComma(coin.price_change_percentage_24h)}%
            </h4>
          </Table.Cell>
          <Table.Cell className="td-dis">
            <h4>${convertMc(coin.market_cap)}</h4>
          </Table.Cell>
          <Table.Cell>
            {mapFavs.includes(coin.symbol) ? (
              <Icon link name="heart" color="grey" />
            ) : null}
          </Table.Cell>
        </Table.Row>
      );
    });
  };

  return (
    <>
      <Segment basic style={{ minHeight: 850 }}>
        <Title
          term={term}
          onTermSubmit={onTermSubmit}
          label="Market"
          userNameDisplay={true}
          searchBarDisplay={true}
        />
        <Table unstackable basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell className="td-dis">Rank</Table.HeaderCell>
              <Table.HeaderCell className=""></Table.HeaderCell>
              <Table.HeaderCell className="three wide">Name</Table.HeaderCell>
              <Table.HeaderCell className="four wide">Price</Table.HeaderCell>
              <Table.HeaderCell className="four wide">24hr</Table.HeaderCell>
              <Table.HeaderCell className="three wide td-dis">
                MarketCap
              </Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body className="tb">{renderMarket()}</Table.Body>
        </Table>
        {renderNotFound()}

        <CoinModal open={open} setOpen={setOpen} />
      </Segment>
      <Segment basic textAlign="center">
        <Divider />
        {copyRight()}
      </Segment>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    market: state.market,
    favorites: state.favorites,
    portfolio: state.portfolio,
    transactions: state.transactions,
    userInfo: state.userInfo.user,
    isLoggedIn: state.userInfo.loggedIn,
    userId: state.userInfo.user ? state.userInfo.user.data.message._id : "",
  };
};

const mapDispatchToProps = {
  getFavorites: (userId) => getFavorites(userId),
  coinSelect: (coin) => coinSelect(coin),
  getMarket: () => getMarket(),
  getTransactions: (userId) => getTransactions(userId),
};

export default connect(mapStateToProps, mapDispatchToProps)(Market);
