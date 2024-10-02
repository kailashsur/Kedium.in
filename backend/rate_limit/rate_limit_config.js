//*************** For public anonymous users ********************
// for User information get
export const PUBLIC_RATE_LIMIT_MAX_REQUESTS = 60; // Max requests allowed
export const PUBLIC_RATE_LIMIT_WINDOW_SECONDS = 60; // Time window in seconds (e.g., 60 seconds)

export const PUBLIC_BLOG_RATE_LIMIT_MAX_REQUESTS = 100; // Max requests allowed
export const PUBLIC_BLOG_RATE_LIMIT_WINDOW_SECONDS = 60; // Time window in seconds (e.g., 60 seconds)

//*************** For authenticated users ********************
// for User information get
export const USER_RATE_LIMIT_MAX_REQUESTS = 200; // Max requests allowed
export const USER_RATE_LIMIT_WINDOW_SECONDS = 60; // Time window in seconds (e.g., 60 seconds)

//*************** For  Premium Users ********************
// for User information get
export const MEMBER_RATE_LIMIT_MAX_REQUESTS = 500; // Max requests allowed
export const MEMBER_RATE_LIMIT_WINDOW_SECONDS = 60; // Time window in seconds (e.g., 60 seconds)

//*************** For  Admin Users ********************
// for User information get
export const ADMIN_RATE_LIMIT_MAX_REQUESTS = 1000; // Max requests allowed
export const ADMIN_RATE_LIMIT_WINDOW_SECONDS = 60; // Time window in seconds (e.g., 60 seconds)
