import AddEventWithOtherDate from "@/components/add-event-with-other-date";
import { createClient } from "@/utils/supabase/server";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { id } = await searchParams;
  const supabase = await createClient();
  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();
  if (!event) {
    return <div>Event not found</div>;
  }
  return <AddEventWithOtherDate event={event} />;
};
export default page;
