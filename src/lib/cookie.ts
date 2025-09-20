export const setCookie = (name: string, value: string, rememberMe: boolean) => {
  const expires = rememberMe
    ? new Date(Date.now() + 7 * 86400 * 1000).toUTCString()
    : new Date(Date.now() + 1 * 86400 * 1000).toUTCString();

  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

export const getCookie = (name: string) => {
  const match = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${name}=`));

  return match ? decodeURIComponent(match.slice(name.length + 1)) : undefined;
};
