import AdminLayout from "@/layouts/AdminLayout";
import { Button, Grid, Input, NativeSelect, Tabs } from "@mantine/core";
import { IconMessageCircle, IconPhoto, IconSettingsCog, IconPlus, IconSearch } from "@tabler/icons-react";
import { ThemedContainer } from "@/components/ui/themed-container";

export default function AdminHRList() {
  return (
    <>
      <div className="flex justify-end gap-2 ">
        <Button variant="outline" size="xs" radius="xs"
          leftSection={<IconSearch size={16} />}
        >
          Search
        </Button>
        <Button variant="outline" size="xs" radius="xs"
          leftSection={<IconPlus size={16} />}
          >
            Add Staff
          </Button>
      </div>
    <ThemedContainer variant="primary">
      <Grid className="mt-4 p-4 rounded-lg">
        <Grid.Col span={2}>
          <Input.Wrapper label="Staff ID" description="" error={false}>
            <Input placeholder="Staff ID" />
          </Input.Wrapper>
        </Grid.Col>
        <Grid.Col span={2}>
          <NativeSelect
            label="Role"
            data={["Doctor", "Nurse", "Receptionist", "Other"]}
          />
        </Grid.Col>
      </Grid>
    </ThemedContainer>
    <ThemedContainer variant="primary">
    <Tabs defaultValue="gallery" className="mt-4">
      <Tabs.List>
        <Tabs.Tab value="gallery" leftSection={<IconPhoto size={12} />}>
          Card view
        </Tabs.Tab>
        <Tabs.Tab value="messages" leftSection={<IconMessageCircle size={12} />}>
          List view
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery" pt="xs">
        Gallery tab content
      </Tabs.Panel>

      <Tabs.Panel value="messages" pt="xs">
        Messages tab content
      </Tabs.Panel>

    </Tabs>
    </ThemedContainer>
    </>
  );
}

AdminHRList.getLayout = (page: React.ReactNode) => (
  <AdminLayout>{page}</AdminLayout>
);
