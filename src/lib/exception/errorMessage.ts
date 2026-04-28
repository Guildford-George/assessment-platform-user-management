// USER MODULE
export const USER_ERRORS = {
  NOT_FOUND: { code: "USR_USER_NOT_FOUND", message: "User not found" },
  ALREADY_EXISTS: { code: "USR_USER_ALREADY_EXISTS", message: "User already exists" },
  INVALID_ID: { code: "USR_USER_INVALID_ID", message: "Invalid user ID" },
  CREATE_FAILED: { code: "USR_USER_CREATE_FAILED", message: "Failed to create user" },
  UPDATE_FAILED: { code: "USR_USER_UPDATE_FAILED", message: "Failed to update user" },
  DELETE_FAILED: { code: "USR_USER_DELETE_FAILED", message: "Failed to delete user" },
  FETCH_FAILED: { code: "USR_USER_FETCH_FAILED", message: "Failed to fetch user" },
  DEACTIVATED: { code: "USR_USER_DEACTIVATED", message: "User account is deactivated" },
  ALREADY_DEACTIVATED: { code: "USR_USER_ALREADY_DEACTIVATED", message: "User account is already deactivated" },
  ALREADY_ACTIVATED: { code: "USR_USER_ALREADY_ACTIVATED", message: "User account is already activated" },
  SUSPENDED: { code: "USR_USER_SUSPENDED", message: "User account is suspended" },
  EMAIL_NOT_VERIFIED: { code: "USR_USER_EMAIL_NOT_VERIFIED", message: "Email not verified" },
  PROFILE_INCOMPLETE: { code: "USR_USER_PROFILE_INCOMPLETE", message: "Profile is incomplete" },
  EMAIL_DUPLICATE: { code: "USR_USER_EMAIL_DUPLICATE", message: "Email already exists" },
  PHONE_DUPLICATE: { code: "USR_USER_PHONE_DUPLICATE", message: "Phone already exists" },
  OPERATION_NOT_ALLOWED: { code: "USR_USER_OPERATION_NOT_ALLOWED", message: "Operation not allowed" },
};

// AUTH MODULE

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: { code: "USR_AUTH_INVALID_CREDENTIALS", message: "Invalid credentials" },
  UNAUTHORIZED: { code: "USR_AUTH_UNAUTHORIZED", message: "Authentication required" },
  FORBIDDEN: { code: "USR_AUTH_FORBIDDEN", message: "Access forbidden" },
  TOKEN_EXPIRED: { code: "USR_AUTH_TOKEN_EXPIRED", message: "Token expired" },
  TOKEN_INVALID: { code: "USR_AUTH_TOKEN_INVALID", message: "Invalid token" },
  REFRESH_TOKEN_INVALID: { code: "USR_AUTH_REFRESH_TOKEN_INVALID", message: "Invalid refresh token" },
  SESSION_EXPIRED: { code: "USR_AUTH_SESSION_EXPIRED", message: "Session expired" },
  SESSION_INVALID: { code: "USR_AUTH_SESSION_INVALID", message: "Invalid session" },
  ACCOUNT_LOCKED: { code: "USR_AUTH_ACCOUNT_LOCKED", message: "Account locked" },
  ACCOUNT_BLOCKED: { code: "USR_AUTH_ACCOUNT_BLOCKED", message: "Account blocked" },
  TOO_MANY_ATTEMPTS: { code: "USR_AUTH_TOO_MANY_ATTEMPTS", message: "Too many attempts" },
  LOGIN_DISABLED: { code: "USR_AUTH_LOGIN_DISABLED", message: "Login disabled" },
  PASSWORD_EXPIRED: { code: "USR_AUTH_PASSWORD_EXPIRED", message: "Password expired" },
  MFA_REQUIRED: { code: "USR_AUTH_MFA_REQUIRED", message: "MFA required" },
  MFA_FAILED: { code: "USR_AUTH_MFA_FAILED", message: "Invalid MFA code" },
  OAUTH_FAILED: { code: "USR_AUTH_OAUTH_FAILED", message: "OAuth failed" },
  SSO_FAILED: { code: "USR_AUTH_SSO_FAILED", message: "SSO failed" },
};

// ORG MODULE
export const ORG_ERRORS = {
  NOT_FOUND: { code: "USR_ORG_NOT_FOUND", message: "Organization not found" },
  INACTIVE: { code: "USR_ORG_INACTIVE", message: "Organization inactive" },
  SUSPENDED: { code: "USR_ORG_SUSPENDED", message: "Organization suspended" },
  ACCESS_DENIED: { code: "USR_ORG_ACCESS_DENIED", message: "Access denied" },
  PERMISSION_DENIED: { code: "USR_ORG_PERMISSION_DENIED", message: "Permission denied" },
  USER_NOT_IN_ORG: { code: "USR_ORG_USER_NOT_IN", message: "User not in organization" },
  USER_ALREADY_IN_ORG: { code: "USR_ORG_USER_ALREADY_IN", message: "User already in organization" },
  USER_LIMIT_REACHED: { code: "USR_ORG_USER_LIMIT_REACHED", message: "User limit reached" },
  ADMIN_REQUIRED: { code: "USR_ORG_ADMIN_REQUIRED", message: "Admin required" },
  CREATE_FAILED: { code: "USR_ORG_CREATE_FAILED", message: "Failed to create organization" },
  UPDATE_FAILED: { code: "USR_ORG_UPDATE_FAILED", message: "Failed to update organization" },
  DELETE_FAILED: { code: "USR_ORG_DELETE_FAILED", message: "Failed to delete organization" },
  SWITCH_FAILED: { code: "USR_ORG_SWITCH_FAILED", message: "Failed to switch organization" },
  ISOLATION_VIOLATION: { code: "USR_ORG_ISOLATION_VIOLATION", message: "Cross-org access not allowed" },
};

export const ROLE_ERRORS = {
  NOT_FOUND: { code: "USR_ROLE_NOT_FOUND", message: "Role not found" },
  EXISTS: { code: "USR_ROLE_EXISTS", message: "Role already exists" },
  CREATE_FAILED: { code: "USR_ROLE_CREATE_FAILED", message: "Failed to create role" },
  UPDATE_FAILED: { code: "USR_ROLE_UPDATE_FAILED", message: "Failed to update role" },
  DELETE_FAILED: { code: "USR_ROLE_DELETE_FAILED", message: "Failed to delete role" },
  ASSIGN_DENIED: { code: "USR_ROLE_ASSIGN_DENIED", message: "Role assignment denied" },
  REMOVE_DENIED: { code: "USR_ROLE_REMOVE_DENIED", message: "Role removal denied" },
  IN_USE: { code: "USR_ROLE_IN_USE", message: "Role is in use" },
  INVALID_ASSIGNMENT: { code: "USR_ROLE_INVALID_ASSIGNMENT", message: "Invalid role assignment" },
  PERMISSION_DENIED: { code: "USR_ROLE_PERMISSION_DENIED", message: "Permission denied" },
  INSUFFICIENT_PERMISSIONS: { code: "USR_ROLE_INSUFFICIENT_PERMISSIONS", message: "Insufficient permissions" },
};

export const INVITE_ERRORS = {
  NOT_FOUND: { code: "USR_INVITE_NOT_FOUND", message: "Invite not found" },
  EXPIRED: { code: "USR_INVITE_EXPIRED", message: "Invite expired" },
  INVALID: { code: "USR_INVITE_INVALID", message: "Invalid invite" },
  ALREADY_ACCEPTED: { code: "USR_INVITE_ALREADY_ACCEPTED", message: "Already accepted" },
  ALREADY_SENT: { code: "USR_INVITE_ALREADY_SENT", message: "Already sent" },
  SEND_FAILED: { code: "USR_INVITE_SEND_FAILED", message: "Failed to send invite" },
  REVOKED: { code: "USR_INVITE_REVOKED", message: "Invite revoked" },
};


export const BUSINESS_ERRORS = {
  CANNOT_DELETE_SELF: { code: "USR_BUSINESS_CANNOT_DELETE_SELF", message: "Cannot delete yourself" },
  CANNOT_DEACTIVATE_SELF: { code: "USR_BUSINESS_CANNOT_DEACTIVATE_SELF", message: "Cannot deactivate yourself" },
  CANNOT_UPDATE_SELF_ROLE: { code: "USR_BUSINESS_CANNOT_UPDATE_SELF_ROLE", message: "Cannot change own role" },
  LAST_ADMIN: { code: "USR_BUSINESS_LAST_ADMIN", message: "Cannot remove last admin" },
  EMAIL_IN_USE: { code: "USR_BUSINESS_EMAIL_IN_USE", message: "Email already in use" },
  PHONE_IN_USE: { code: "USR_BUSINESS_PHONE_IN_USE", message: "Phone already in use" },
  PASSWORD_POLICY_VIOLATION: { code: "USR_BUSINESS_PASSWORD_POLICY_VIOLATION", message: "Password too weak" },
  USERNAME_TAKEN: { code: "USR_BUSINESS_USERNAME_TAKEN", message: "Username already taken" },
  INVALID_STATE: { code: "USR_BUSINESS_INVALID_STATE", message: "Invalid state transition" },
  OPERATION_NOT_ALLOWED: { code: "USR_BUSINESS_OPERATION_NOT_ALLOWED", message: "Operation not allowed" },
  DEPENDENCY_EXISTS: { code: "USR_BUSINESS_DEPENDENCY_EXISTS", message: "Dependency exists" },
  RESOURCE_LOCKED: { code: "USR_BUSINESS_RESOURCE_LOCKED", message: "Resource is locked" },
};

export const SECURITY_ERRORS = {
  SUSPICIOUS_ACTIVITY: { code: "USR_SEC_SUSPICIOUS_ACTIVITY", message: "Suspicious activity detected" },
  TEMPORARY_BLOCK: { code: "USR_SEC_TEMPORARY_BLOCK", message: "Temporarily blocked" },
  PERMANENT_BLOCK: { code: "USR_SEC_PERMANENT_BLOCK", message: "Permanently blocked" },
  RATE_LIMIT: { code: "USR_SEC_RATE_LIMIT", message: "Rate limit exceeded" },
};

export const SYSTEM_ERRORS = {
  INTERNAL_ERROR: { code: "USR_SYSTEM_INTERNAL_ERROR", message: "Internal server error" },
  DATABASE_ERROR: { code: "USR_SYSTEM_DATABASE_ERROR", message: "Database error" },
  TIMEOUT: { code: "USR_SYSTEM_TIMEOUT", message: "Request timed out" },
  SERVICE_UNAVAILABLE: { code: "USR_SYSTEM_SERVICE_UNAVAILABLE", message: "Service unavailable" },
  CONFIG_MISSING: { code: "USR_SYSTEM_CONFIG_MISSING", message: "Missing configuration" },
};