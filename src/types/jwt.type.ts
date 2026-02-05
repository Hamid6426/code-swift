export interface JWTPayload {
  sub: string;
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}
