"use client";

import { Grid } from "@mantine/core";
import MasterDataListComponent from "./master-data-list.component";
import SubDataComponent from "./sub-data-list.component";
import { useState } from "react";

export default function MasterDataComponent() {
  const [selectedMasterCode, setSelectedMasterCode] = useState<string>('');

  return (
    <>
      <Grid pt={10}>
        <Grid.Col span={{ base: 12, xs: 4 }}>
          <MasterDataListComponent 
            onItemClick={(item, rowNum) => {
              if (item) {
                setSelectedMasterCode(item?.masterDataCode || "");
              }
            }}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 8 }}>
          <SubDataComponent masterCode={selectedMasterCode} />
        </Grid.Col>
      </Grid>
    </>
  );
}