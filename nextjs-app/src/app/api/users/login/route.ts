import { loginUser } from "../_store";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };

    if (!body.email || !body.password) {
      return Response.json(
        { message: "email and password are required." },
        { status: 400 }
      );
    }

    const user = await loginUser({
      email: body.email,
      password: body.password,
    });

    return Response.json({ user }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed.";
    return Response.json({ message }, { status: 401 });
  }
}
