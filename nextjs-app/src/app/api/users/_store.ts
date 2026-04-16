import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

export type StoredUser = {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: string;
};

type PublicUser = Omit<StoredUser, "passwordHash">;

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "users.json");

async function ensureStore() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, JSON.stringify([], null, 2), "utf8");
  }
}

async function readUsers(): Promise<StoredUser[]> {
  await ensureStore();
  const content = await fs.readFile(dataFile, "utf8");
  return JSON.parse(content) as StoredUser[];
}

async function writeUsers(users: StoredUser[]) {
  await ensureStore();
  await fs.writeFile(dataFile, JSON.stringify(users, null, 2), "utf8");
}

function hashPassword(password: string) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function registerUser(input: {
  username: string;
  email: string;
  password: string;
}): Promise<PublicUser> {
  const users = await readUsers();
  const normalizedEmail = input.email.trim().toLowerCase();
  const normalizedUsername = input.username.trim().toLowerCase();

  const exists = users.some(
    (user) =>
      user.email.toLowerCase() === normalizedEmail ||
      user.username.toLowerCase() === normalizedUsername
  );
  if (exists) {
    throw new Error("User already exists with that email or username.");
  }

  const newUser: StoredUser = {
    id: crypto.randomUUID(),
    username: input.username.trim(),
    email: normalizedEmail,
    passwordHash: hashPassword(input.password),
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  await writeUsers(users);

  const { passwordHash: _, ...publicUser } = newUser;
  return publicUser;
}

export async function loginUser(input: {
  email: string;
  password: string;
}): Promise<PublicUser> {
  const users = await readUsers();
  const normalizedEmail = input.email.trim().toLowerCase();
  const user = users.find(
    (item) => item.email.toLowerCase() === normalizedEmail
  );
  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const hashed = hashPassword(input.password);
  if (hashed !== user.passwordHash) {
    throw new Error("Invalid email or password.");
  }

  const { passwordHash: _, ...publicUser } = user;
  return publicUser;
}
