import React from "react";
import {
  Header,
  Grid,
  Icon,
  Container,
  Segment,
  Button,
  Divider,
} from "semantic-ui-react";
import { copyRight } from "../utils/Helper";
import { NavLink } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <Container textAlign="center" fluid style={{ minHeight: 860 }}>
        <Segment basic size="massive">
          <Grid stackable>
            <Grid.Row>
              <Grid.Column>
                <Header size="huge">Coinpurse.app </Header>
                <Divider />
                <Header size="large">Cryptocurrency Investment Tracker</Header>
                <Header as="h2">
                  One web app to track all of your cryptocurrency investments
                  and potential trades. 
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Segment basic></Segment>
            </Grid.Row>
            <Grid.Row>
              <Segment basic></Segment>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column>
                <Icon name="shopping cart" size="large" />
                <Header as="h3">Market</Header>
                <Header as="h4">
                  All-in-one cryptocurrency tracking app. View the latest
                  prices, monitor your portfolio, test potential trades, and
                  learn about the top cryptocurrencies. Buy and Sell the latest
                  cryptocurrencies at no cost or risk.{" "}
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Icon name="folder open" size="large" />
                <Header as="h3">Portfolio</Header>
                <Header as="h4">
                  Keep an uptodate list of your favorite coins and current coins
                  you own. Track your Portfolio stats suchs as: Estimated
                  Portfolio Value, Estimated USD Gain, Top Performing and Worst
                  Performing assets.{" "}
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Icon name="history" size="large" />
                <Header as="h3">Transaction History</Header>
                <Header as="h4">
                  Easily be able to sort through transactions by keeping a
                  record of every transaction you have made. Storing, date,
                  time, price, amount, cost, and important notes to keep track
                  of information regarding that trade.{" "}
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Segment basic></Segment>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <NavLink to="/register">
                  <Button color="green" size="massive" content="Get Started Today!" />
                </NavLink>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
      <Divider />
      <Segment basic textAlign="center">
        {copyRight()}
      </Segment>
    </>
  );
};

export default Landing;
