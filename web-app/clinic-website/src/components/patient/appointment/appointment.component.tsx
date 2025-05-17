"use client";

import { Grid } from "@mantine/core";
import AppointmentPersonalComponent from "./appointment-personal.compoment";
import AppointmentListComponent from "./appointment-list.component";

export default function AppointmentComponent() {
  return (
    <>
      <Grid pt={10}>
        <Grid.Col span={{ base: 12, xs: 3 }}>
          <AppointmentPersonalComponent /> 
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 9 }}>
          <AppointmentListComponent />
        </Grid.Col>
      </Grid>
    </>
  );
}