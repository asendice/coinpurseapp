import React, { useEffect } from "react";
import { roundComma, ifNegative } from "../utils/Helper";
import {
  Header,
  Segment,
  Divider,
  Statistic,
  Grid,
  Icon,
  Image,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { getMarket } from "../actions";

const UserStats = (props) => {
  useEffect(() => {
    props.getMarket();
  }, []);

  const mapNameTrans = props.portfolio.map((coin) => {
    return coin.name;
  });

  const addTotals = Array.from(
    props.portfolio.reduce(
      (m, { name, total }) => m.set(name, (m.get(name) || 0) + total),
      new Map()
    ),
    ([name, total]) => ({ name, total })
  );

  const filterMarket = props.market.filter((coin) => {
    if (mapNameTrans.includes(coin.name)) {
      return coin;
    } else {
      return null;
    }
  });
  const mergeByName = (arr1, arr2) =>
    arr1.map((itm) => ({
      ...arr2.find((item) => item.name === itm.name && item),
      ...itm,
    }));

  const upToDatePortfolio = mergeByName(filterMarket, props.portfolio);

  const mapPortfolioTotal = upToDatePortfolio.map((coin) => {
    return coin.amt * coin.current_price;
  });
  const mapTotal = addTotals.map((coin) => {
    return coin.total;
  });
  const origTotal = mapTotal.reduce((a, b) => {
    return a + b;
  }, 0);

  const portfolioTotal = mapPortfolioTotal.reduce((a, b) => {
    return a + b;
  }, 0);

  const SendGain = () => {
    useEffect(() => {
      const percentGain = ((portfolioTotal - origTotal) / origTotal) * 100;
      props.setPortPercentGain(percentGain);
    }, [props.open]);
  };

  SendGain();

  const renderPortTotal = () => {
    return (
      <Statistic>
        <Statistic.Value>{`$${roundComma(portfolioTotal)}`}</Statistic.Value>
        <Statistic.Label style={{ color: "grey" }}>
          Estimated Total Value
        </Statistic.Label>
      </Statistic>
    );
  };
  const renderPortGain = () => {
    const portGain = portfolioTotal - origTotal;
    return (
      <Statistic size="small">
        <Statistic.Value
          style={{
            color: portGain === 0 ? "grey" : portGain > 0 ? "green" : "red",
          }}
        >
          {(ifNegative(roundComma(portGain)))}
        </Statistic.Value>
        <Statistic.Label style={{ color: "grey" }}>
          Estimated Gain
        </Statistic.Label>
      </Statistic>
    );
  };

  const renderTopGain = () => {
    if (upToDatePortfolio.length > 0) {
      const portListMap = upToDatePortfolio.map((coin) => {
        return {
          name: coin.name,
          image: coin.image,
          symbol: coin.symbol,
          gain: coin.amt * coin.current_price - coin.total,
        };
      });
      const top = portListMap.reduce((prev, current) => {
        return prev.gain > current.gain ? prev : current;
      });
      return (
        <>
          <Statistic size="mini">
            <Statistic.Label>
              <Image avatar src={top.image} />
              {top.symbol}
            </Statistic.Label>
            <Statistic.Value
              style={{
                color: top.gain === 0 ? "grey" : top.gain > 0 ? "green" : "red",
              }}
            >
              {ifNegative(roundComma(top.gain))}
            </Statistic.Value>
            <Statistic.Label style={{ color: "grey" }}>
              <Icon name="arrow up" />
              Top Perfomer
            </Statistic.Label>
          </Statistic>
        </>
      );
    }
  };
  const renderWorstGain = () => {
    if (upToDatePortfolio.length > 0) {
      const portListMap = upToDatePortfolio.map((coin) => {
        return {
          name: coin.name,
          image: coin.image,
          symbol: coin.symbol,
          gain: coin.amt * coin.current_price - coin.total,
        };
      });
      const bot = portListMap.reduce((prev, current) => {
        return prev.gain < current.gain ? prev : current;
      });
      return (
        <>
          <Statistic size="mini">
            <Statistic.Label>
              <Image avatar src={bot.image} />
              {bot.symbol}
            </Statistic.Label>
            <Statistic.Value
              style={{
                color: bot.gain === 0 ? "grey" : bot.gain > 0 ? "green" : "red",
              }}
            >
              {" "}
              {ifNegative(roundComma(bot.gain))}
            </Statistic.Value>
            <Statistic.Label style={{ color: "grey" }}>
              <Icon name="arrow down" />
              Worst Performer
            </Statistic.Label>
          </Statistic>
        </>
      );
    }
  };

  return (
    <>
      <Header as="h2">{props.header}</Header>
      <Divider />
      <Segment basic textAlign="center">
        <Grid>
          <Grid.Row>
            <Grid.Column>{renderPortTotal()}</Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>{renderPortGain()}</Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>{renderTopGain()}</Grid.Column>
            <Grid.Column>{renderWorstGain()}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    market: state.market,
    portfolio: state.portfolio.list,
  };
};

const mapDispatchToProps = {
  getMarket: () => getMarket(),
};

export default connect(mapStateToProps, mapDispatchToProps)(UserStats);
