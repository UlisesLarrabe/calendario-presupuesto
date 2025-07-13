import AddEvent from "@/components/add-event";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { id } = await searchParams;
  return <AddEvent id={id as string} />;
};
export default page;
