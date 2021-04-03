import React, { useEffect } from "react";
import { roundComma, renderArrow } from "../utils/Helper";
import { Segment, Header, Icon, Divider, Table } from "semantic-ui-react";
import { deleteFavorite, getFavorites, getMarket } from "../actions";
import { connect } from "react-redux";

const Favorites = (props) => {
  useEffect(() => {
    props.getFavorites(props.userId);
    props.getMarket();
  }, []);

  const handleDeleteClick = (symbol) => {
    const filterFav = props.favorites.favorites.filter(
      (coin) => coin.symbol === symbol
    );
    props.deleteFavorite(filterFav[0]._id);
  };

  const renderTableRow = () => {
    const mapFavorites = props.favorites.favorites.map((fav) => {
      return fav.symbol;
    });
    const filterMarket = props.market.filter((coin) => {
      if (mapFavorites.includes(coin.symbol)) {
        return coin;
      } else {
        return null;
      }
    });
    if (props.favorites.favorites.length > 0) {
      return filterMarket.map((fav) => {
        return (
          <tr key={fav.id}>
            <td>
              <img className="ui image avatar" src={fav.image} alt={fav.id} />
            </td>
            <td className="td-dis">{fav.name}</td>
            <td>{`$${roundComma(fav.current_price)}`}</td>
            <td
              style={{
                color: fav.price_change_percentage_24h >= 0 ? "green" : "red",
              }}
            >
              {renderArrow(fav.price_change_percentage_24h)}
              {`${roundComma(fav.price_change_percentage_24h)}%`}
            </td>
            <td>
              <Icon
                className="tb"
                style={{ color: "grey" }}
                name="x"
                onClick={() => handleDeleteClick(fav.symbol)}
              />
            </td>
          </tr>
        );
      });
    } else {
      return (
        <tr>
          <td style={{ color: "grey" }}>
            Go to <a href="/market">Market</a> to favorite coins{" "}
            <Icon name="heart" />
          </td>
        </tr>
      );
    }
  };

  return (
    <>
      <Header as="h2">{props.header}</Header>
      <Divider />
      <Segment basic>
        <Segment
          basic
          style={{ overflow: "auto", maxHeight: 300, minHeight: 300 }}
        >
          <Table basic="very" unstackable>
            <tbody>{renderTableRow()}</tbody>
          </Table>
        </Segment>
      </Segment>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites,
    market: state.market,
    userInfo: state.userInfo.user,
    isLoggedIn: state.userInfo.loggedIn,
    userId: state.userInfo.user ? state.userInfo.user.data.message._id : "",
  };
};

const mapDispatchToProps = {
  getFavorites: (userId) => getFavorites(userId),
  getMarket: () => getMarket(),
  deleteFavorite: (coinId) => deleteFavorite(coinId),
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);