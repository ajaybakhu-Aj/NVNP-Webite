// Shared API helper: JSON fetch with Django CSRF handling.
// Django sets the `csrftoken` cookie (planted by GET /api/auth/me/);
// every POST must echo it back in the X-CSRFToken header.

function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^|;\\s*)" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[2]) : null;
}

async function ensureCsrfCookie() {
  if (!getCookie("csrftoken")) {
    try {
      await fetch("/api/auth/me/", { credentials: "same-origin" });
    } catch {
      /* backend unreachable — caller handles the failed POST */
    }
  }
  return getCookie("csrftoken");
}

export async function apiGet(url) {
  const res = await fetch(url, { credentials: "same-origin" });
  if (!res.ok) throw new Error(`GET ${url} failed (${res.status})`);
  return res.json();
}

export async function apiPost(url, body) {
  const token = await ensureCsrfCookie();
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "X-CSRFToken": token } : {}),
    },
    body: JSON.stringify(body ?? {}),
  });
  let data = null;
  try {
    data = await res.json();
  } catch {
    /* non-JSON error body */
  }
  if (!res.ok) {
    const message = (data && data.error) || `Request failed (${res.status})`;
    const err = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

// Upload an image file to the backend (staff only). Returns { url, srcset, id }.
// The server converts it to an optimized WebP via the MediaAsset pipeline.
export async function uploadImage(file, altText) {
  const token = await ensureCsrfCookie();
  const form = new FormData();
  form.append("file", file);
  form.append("alt_text", altText || file.name);
  const res = await fetch("/api/upload/", {
    method: "POST",
    credentials: "same-origin",
    headers: token ? { "X-CSRFToken": token } : {},
    body: form,
  });
  let data = null;
  try {
    data = await res.json();
  } catch {
    /* non-JSON error body */
  }
  if (!res.ok) {
    throw new Error((data && data.error) || `Upload failed (${res.status})`);
  }
  return data;
}

// --- Auth API ---

export function authMe() {
  return apiGet("/api/auth/me/");
}

export function authLogin(email, password) {
  return apiPost("/api/auth/login/", { email, password });
}

export function authLogout() {
  return apiPost("/api/auth/logout/", {});
}

export function authSignup(name, email, password) {
  return apiPost("/api/auth/signup/", { name, email, password });
}

// --- Password reset (server-side OTP flow) ---

export function passwordResetRequest(email) {
  return apiPost("/api/auth/password-reset/request/", { email });
}

export function passwordResetVerify(email, code) {
  return apiPost("/api/auth/password-reset/verify/", { email, code });
}

export function passwordResetConfirm(email, code, password) {
  return apiPost("/api/auth/password-reset/confirm/", { email, code, password });
}
