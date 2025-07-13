import { createClient } from "@/utils/supabase/server";
import EventInfo from "@/components/event-info";

const EventId = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const supabase = await createClient();
  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();
  return <EventInfo event={event} />;
};
export default EventId;
