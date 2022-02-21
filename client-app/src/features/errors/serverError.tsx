import React from "react";
import { Container, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default function ServerError() {
  const { commonStore } = useStore();

  return (
    <Container>
      <Header as="h1" content="server error" />
      <Header as="h5" color="red" content={commonStore.error?.message} />
      {commonStore.error?.details && (
        <Segment>
          <Header as="h4" color="teal" content="stack trace" />
          <code style={{ marginTop: 10 }}>{commonStore.error.details}</code>
        </Segment>
      )}
    </Container>
  );
}
