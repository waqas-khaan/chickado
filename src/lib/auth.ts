import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'chickado_default_fallback_secret_must_change_in_production_32chars'
);

export const SESSION_COOKIE_NAME = 'chickado_admin_session';

export interface AdminSessionPayload {
  userId: string;
  username: string;
  role: 'ADMIN' | 'CASHIER';
  exp?: number;
}

/**
 * Cookie security options strictly adhering to security guidelines:
 * HttpOnly, Secure, SameSite=Lax, with 8-hour expiry.
 */
export const SESSION_COOKIE_OPTIONS = {
  name: SESSION_COOKIE_NAME,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 8 * 60 * 60, // 8 hours
};

/**
 * In-memory failed login rate-limiter and account lockout store.
 * Locks out after 5 consecutive failed attempts for 15 minutes.
 */
interface LockoutEntry {
  attempts: number;
  lockoutUntil: number | null;
  lastAttempt: number;
}

const loginAttempts = new Map<string, LockoutEntry>();

export function checkLoginLockout(identifier: string): { locked: boolean; remainingSeconds?: number } {
  const entry = loginAttempts.get(identifier);
  if (!entry) return { locked: false };

  const now = Date.now();
  if (entry.lockoutUntil && entry.lockoutUntil > now) {
    const remainingSeconds = Math.ceil((entry.lockoutUntil - now) / 1000);
    return { locked: true, remainingSeconds };
  }

  // Lockout expired, reset
  if (entry.lockoutUntil && entry.lockoutUntil <= now) {
    loginAttempts.delete(identifier);
  }

  return { locked: false };
}

export function recordFailedLogin(identifier: string): { locked: boolean; attemptsRemaining: number } {
  const now = Date.now();
  const entry = loginAttempts.get(identifier) || { attempts: 0, lockoutUntil: null, lastAttempt: now };

  entry.attempts += 1;
  entry.lastAttempt = now;

  if (entry.attempts >= 5) {
    entry.lockoutUntil = now + 15 * 60 * 1000; // 15 minute lockout
    loginAttempts.set(identifier, entry);
    return { locked: true, attemptsRemaining: 0 };
  }

  loginAttempts.set(identifier, entry);
  return { locked: false, attemptsRemaining: 5 - entry.attempts };
}

export function resetLoginAttempts(identifier: string): void {
  loginAttempts.delete(identifier);
}

/**
 * Hash password with bcrypt using 12 salt rounds
 */
export async function hashPassword(plainPassword: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(plainPassword, salt);
}

/**
 * Compare plain password against stored bcrypt hash
 */
export async function verifyPassword(plainPassword: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hash);
}

/**
 * Issue a signed JWT token for admin session
 */
export async function createSessionToken(payload: AdminSessionPayload): Promise<string> {
  return new SignJWT({
    userId: payload.userId,
    username: payload.username,
    role: payload.role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(JWT_SECRET);
}

/**
 * Verify and decode an admin session JWT
 */
export async function verifySessionToken(token: string): Promise<AdminSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      userId: payload.userId as string,
      username: payload.username as string,
      role: payload.role as 'ADMIN' | 'CASHIER',
      exp: payload.exp,
    };
  } catch {
    return null;
  }
}

