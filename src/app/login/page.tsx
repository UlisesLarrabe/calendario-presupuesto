import LoginPage from "@/components/login-page";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const verifyCookies = await cookies();
  const token = verifyCookies.has("auth");
  if (token) {
    redirect("/");
  }
  return <LoginPage />;
};

export default page;
