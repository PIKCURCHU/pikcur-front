export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("id");
  localStorage.removeItem("name");
  localStorage.removeItem("authority");
  window.location.href = "/";
};