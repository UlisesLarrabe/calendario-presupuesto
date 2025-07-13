import { createClient } from "@/utils/supabase/server";
import EventInfo from "@/components/event-info";

const EventId = async ({
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
  return <EventInfo event={event} />;
};
export default EventId;
