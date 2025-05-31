"use client";

import { Grid } from "@mantine/core";

export default function MasterDataComponent() {
  return (
    <>
      <Grid pt={10}>
        <Grid.Col span={{ base: 12, xs: 4 }}>
          Left
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 8 }}>
          Right
        </Grid.Col>
      </Grid>
    </>
  );
}