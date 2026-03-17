export function getAdminToken() {
  if (typeof window === "undefined") {
    return "";
  }

  return window.localStorage.getItem("admin_token") || "";
}

export function setAdminToken(token) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem("admin_token", token);
}
