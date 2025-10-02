export function DeleteCookie(...cookie: string[]): void {
  cookie.forEach((name) => {
    document.cookie = `${name}=; Max-age=0; path=/;`;
  });
}
