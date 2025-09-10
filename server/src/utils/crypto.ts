// import bcrypt from 'bcryptjs';
// import crypto from 'crypto';

// export async function hashPassword(plain: string) {
//   const rounds = Number(process.env.BCRYPT_ROUNDS || 12);
//   return bcrypt.hash(plain, rounds);
// }

// export async function verifyPassword(plain: string, hash: string) {
//   return bcrypt.compare(plain, hash);
// }

// export function generateSessionToken(): string {
//   return crypto.randomBytes(32).toString('hex');
// }

// export function sha256Hex(input: string): string {
//   return crypto.createHash('sha256').update(input).digest('hex');
// }
