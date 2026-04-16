import { registerUser } from "../_store";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      username?: string;
      email?: string;
      password?: string;
    };

    if (!body.username || !body.email || !body.password) {
      return Response.json(
        { message: "username, email, and password are required." },
        { status: 400 }
      );
    }

    const user = await registerUser({
      username: body.username,
      email: body.email,
      password: body.password,
    });

    return Response.json({ user }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Registration failed.";
    return Response.json({ message }, { status: 400 });
  }
}
