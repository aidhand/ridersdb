/**
 * Authentication and authorization types
 */

/**
 * User authentication status
 */
export type AuthStatus =
  | "authenticated"
  | "unauthenticated"
  | "pending"
  | "expired";

/**
 * Authentication methods
 */
export type AuthMethod = "email" | "oauth" | "apiKey" | "jwt" | "session";

/**
 * User role types
 */
export type UserRole = "admin" | "user" | "moderator" | "viewer" | "editor";

/**
 * Permission types
 */
export type Permission = "read" | "write" | "delete" | "admin" | "moderate";

/**
 * Authentication session
 */
export interface AuthSession {
  id: string;
  userId: string;
  status: AuthStatus;
  method: AuthMethod;
  createdAt: Date;
  expiresAt: Date;
  lastActiveAt: Date;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
}

/**
 * User profile
 */
export interface UserProfile {
  id: string;
  email: string;
  username?: string;
  displayName?: string;
  avatar?: string;
  roles: UserRole[];
  permissions: Permission[];
  isActive: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  metadata?: Record<string, any>;
}

/**
 * Authentication token
 */
export interface AuthToken {
  accessToken: string;
  refreshToken?: string;
  tokenType: "bearer" | "jwt";
  expiresIn: number;
  scope?: string[];
  issuedAt: Date;
}

/**
 * OAuth provider configuration
 */
export interface OAuthProvider {
  name: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scope: string[];
  authorizeUrl: string;
  tokenUrl: string;
  userInfoUrl: string;
  enabled: boolean;
}

/**
 * OAuth user info
 */
export interface OAuthUserInfo {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  provider: string;
  raw?: Record<string, any>;
}

/**
 * API key configuration
 */
export interface ApiKey {
  id: string;
  name: string;
  key: string;
  userId: string;
  permissions: Permission[];
  isActive: boolean;
  expiresAt?: Date;
  createdAt: Date;
  lastUsedAt?: Date;
  metadata?: Record<string, any>;
}

/**
 * Authentication configuration
 */
export interface AuthConfig {
  sessionDuration: number;
  tokenDuration: number;
  refreshTokenDuration: number;
  maxSessions: number;
  requireVerification: boolean;
  allowPasswordReset: boolean;
  providers: OAuthProvider[];
  features: {
    registration: boolean;
    oauth: boolean;
    apiKeys: boolean;
    twoFactor: boolean;
    sessionManagement: boolean;
  };
}

/**
 * Login credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
  twoFactorCode?: string;
}

/**
 * Registration data
 */
export interface RegistrationData {
  email: string;
  password: string;
  username?: string;
  displayName?: string;
  acceptTerms: boolean;
  metadata?: Record<string, any>;
}

/**
 * Password reset request
 */
export interface PasswordResetRequest {
  email: string;
  token?: string;
  newPassword?: string;
}

/**
 * Two-factor authentication setup
 */
export interface TwoFactorAuth {
  enabled: boolean;
  secret?: string;
  backupCodes?: string[];
  method: "totp" | "sms" | "email";
  lastUsedAt?: Date;
}

/**
 * Security event types
 */
export type SecurityEventType =
  | "login"
  | "logout"
  | "registration"
  | "password_change"
  | "password_reset"
  | "account_locked"
  | "suspicious_activity"
  | "permission_change";

/**
 * Security audit log
 */
export interface SecurityEvent {
  id: string;
  type: SecurityEventType;
  userId?: string;
  sessionId?: string;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  success: boolean;
  details?: Record<string, any>;
  riskLevel: "low" | "medium" | "high";
}
