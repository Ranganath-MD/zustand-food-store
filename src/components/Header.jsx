import React from 'react'
import { Container, AppShell, Text } from '@mantine/core'

export const AppHeader = () => {
  return (
    <AppShell.Header height={60} padding="md">
      <Container size="md">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Text weight={700} size="md">
            Smart-Q
          </Text>
        </div>
      </Container>
    </AppShell.Header>
  );
}
