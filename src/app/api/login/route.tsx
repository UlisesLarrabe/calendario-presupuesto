import { cookies } from "next/headers";

export async function POST(req) {
  const { data } = await req.json();
  const newCookies = await cookies();
  const user = data.user;

  if (data) {
    const userAuth = {
      email: user.email,
      id: user.id,
    };

    newCookies.set({
      name: "auth",
      value: JSON.stringify(userAuth),
      maxAge: data.session.expires_at,
      httpOnly: true,
    });

    return Response.json({
      status: 200,
      message: "Login success",
    });
  }
  return Response.json({
    status: 401,
    message: "Login failed",
  });
}
