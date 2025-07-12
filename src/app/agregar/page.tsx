import AddEvent from "@/components/add-event";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const verifyCookies = await cookies();
  const token = verifyCookies.has("auth");
  if (!token) {
    redirect("/login");
  }
  return <AddEvent />;
};
export default page;
