import AddEventWithOtherDate from "@/components/add-event-with-other-date";
import { createClient } from "@/utils/supabase/server";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
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
