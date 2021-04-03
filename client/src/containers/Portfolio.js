import React, { useState, useEffect } from "react";
import Title from "../containers/Title";
import Favorites from "./Favorites";
import TransactionHistory from "./TransactionHistory";
import PortfolioList from "./PortfolioList";
import UserStats from "./UserStats";
import CoinModal from "./CoinModal";
import { copyRight } from "../utils/Helper";
import { Redirect } from "react-router";
import { Grid, Segment, Container, Divider } from "semantic-ui-react";
import { getMarket, getTransactions } from "../actions";
import { connect } from "react-redux";

const Portfolio = (props) => {
  const [open, setOpen] = useState(false);
  const [portTotal, setPortTotal] = useState(0);
  const [portGain, setPortGain] = useState(0);
  const [portPercentGain, setPortPercentGain] = useState(0);

  useEffect(() => {
    props.getMarket();
    props.getTransactions(props.userId);
  }, [open]);
  if (props.isLoggedIn) {
    return (
      <>
        <Container fluid>
          <Segment basic>
            <Title
              label={`Portfolio`}
              portPercentGain={portPercentGain}
              searchBarDisplay={false}
              userNameDisplay={true}
            />
            <Grid>
              <Grid.Row>
                <Grid.Column tablet={16} computer={8}>
                  <UserStats
                    header="Balance"
                    portTotal={portTotal}
                    portPercentGain={portPercentGain}
                    portGain={portGain}
                    setPortTotal={setPortTotal}
                    setPortPercentGain={setPortPercentGain}
                    setPortGain={setPortGain}
                    open={open}
                  />
                </Grid.Column>

                <Grid.Column tablet={16} computer={8}>
                  <Favorites header="Favorites" />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column>
                  <PortfolioList
                    header="Coin List"
                    portTotal={portTotal}
                    setPortTotal={setPortTotal}
                    setPortGain={setPortGain}
                    setOpen={setOpen}
                    open={open}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={1}>
                <Grid.Column>
                  <TransactionHistory />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <Divider />
          <Segment basic textAlign="center">
            {copyRight()}
          </Segment>
          <CoinModal open={open} setOpen={setOpen} />
        </Container>
      </>
    );
  } else {
    return <Redirect to="/market" />;
  }
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo.user,
    isLoggedIn: state.userInfo.loggedIn,
    userId: state.userInfo.user ? state.userInfo.user.data.message._id : "",
  };
};

const mapDispatchToProps = {
  getTransactions: (userId) => getTransactions(userId),
  getMarket: () => getMarket(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
