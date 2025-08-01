import bcrypt from "bcryptjs"

export async function hashing(password) {
  const salt =  10;
  const hash = await bcrypt.hash(password, salt);
  return hash
}

export async function isMatched(password, passwordHash) {
  return await bcrypt.compare(password, passwordHash);
}
