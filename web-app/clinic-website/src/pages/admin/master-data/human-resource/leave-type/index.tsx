import HrMstDataList from "@/components/admin/master-data/hr/hr-mst-data-list.coponent";
import { ThemedContainer } from "@/components/ui/themed-container";
import AdminLayout from "@/layouts/AdminLayout";
import { Button, Grid, Input } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react/dist/esm/icons";

export default function LeaveType() {

  return (
    <>
      <div className="flex justify-end gap-2 ">
        <Button
          variant="outline"
          size="xs"
          radius="xs"
          leftSection={<IconPlus size={16} />}
        >
          Add Leave Type
        </Button>
      </div>
      {/* <ThemedContainer variant="primary" className="mt-4">
        <Grid className="rounded-lg p-4">
          <Grid.Col span={3}>
            <Input.Wrapper label="Leave Type" description="" error={false}>
              <Input placeholder="Leave Type" />
            </Input.Wrapper>
          </Grid.Col>
        </Grid>
      </ThemedContainer> */}
      <ThemedContainer variant="primary" className="mt-4">
        <HrMstDataList />
      </ThemedContainer>
    </>
  );
}

LeaveType.getLayout = (page: React.ReactNode) => (
  <AdminLayout>{page}</AdminLayout>
);
