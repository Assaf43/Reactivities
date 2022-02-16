import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";

export default function HomePage() {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as={"h1"} inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Activities
        </Header>
        <Header as={"h2"} inverted content="Welcome To Reactivities" />
        <Button as={Link} to={"/activities"} inverted size="huge">
          Take Me To The Activities!
        </Button>
      </Container>
    </Segment>
  );
}
