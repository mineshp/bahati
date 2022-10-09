import arc from "@architect/functions";
import bcrypt from "bcryptjs";
import invariant from "tiny-invariant";

export type User = { id: `username#${string}`; username: string };
export type Password = { password: string };

export async function getUserById(id: User["id"]): Promise<User | null> {
  const db = await arc.tables();
  const result = await db.user.query({
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: { ":pk": id },
  });

  const [record] = result.Items;
  if (record) return { id: record.pk, username: record.username };
  return null;
}

export async function getUserByUsername(username: User["username"]) {
  return getUserById(`username#${username}`);
}

async function getUserPasswordByUsername(username: User["username"]) {
  const db = await arc.tables();
  const result = await db.password.query({
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: { ":pk": `username#${username}` },
  });

  const [record] = result.Items;

  if (record) return { hash: record.password };
  return null;
}

export async function createUser(
  username: User["username"],
  password: Password["password"]
) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const db = await arc.tables();
  
  await db.password.put({
    pk: `username#${username}`,
    password: hashedPassword,
  });

  await db.user.put({
    pk: `username#${username}`,
    username,
  });

  const user = await getUserByUsername(username);
  invariant(user, `User not found after being created. This should not happen`);

  return user;
}

export async function deleteUser(username: User["username"]) {
  const db = await arc.tables();
  await db.password.delete({ pk: `username#${username}` });
  await db.user.delete({ pk: `username#${username}` });
}

export async function verifyLogin(
  username: User["username"],
  password: Password["password"]
) {
  const userPassword = await getUserPasswordByUsername(username);

  if (!userPassword) {
    return undefined;
  }

  const isValid = await bcrypt.compare(password, userPassword.hash);
  if (!isValid) {
    return undefined;
  }

  return getUserByUsername(username);
}
