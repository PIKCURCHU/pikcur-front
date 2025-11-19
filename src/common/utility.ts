export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("id");
  localStorage.removeItem("name");
  localStorage.removeItem("authority");
  window.location.href = "/";
};