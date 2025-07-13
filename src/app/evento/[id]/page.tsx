import { createClient } from "@/utils/supabase/server";
import EventInfo from "@/components/event-info";

const EventId = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const supabase = await createClient();
  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();
  return <EventInfo event={event} />;
};
export default EventId;
