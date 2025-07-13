import AddEvent from "@/components/add-event";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <AddEvent id={id} />;
};
export default page;
