import { jwtVerify, JWTPayload } from "jose";

export async function verifyToken(token: string): Promise<JWTPayload> {
  if (!token) {
    throw new Error("No token provided");
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode("secret")
    );
    return payload;
  } catch (error) {
    throw new Error("Token invalido");
  }
}
