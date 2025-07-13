import AddEvent from "@/components/add-event";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <AddEvent id={id} />;
};
export default page;
