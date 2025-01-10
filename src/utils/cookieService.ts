// src/utils/cookieService.ts
import Cookies from "universal-cookie";

const cookies = new Cookies();

interface CookieOptions {
  path?: string;
  expires?: Date;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

const defaultOptions: CookieOptions = {
  path: "/",
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production",
};

export const cookieService = {
  // 设置 cookie
  set(name: string, value: any, options: CookieOptions = {}): void {
    cookies.set(name, value, { ...defaultOptions, ...options });
  },

  // 获取 cookie
  get(name: string): any {
    return cookies.get(name);
  },

  // 删除 cookie
  remove(name: string, options: CookieOptions = {}): void {
    cookies.remove(name, { ...defaultOptions, ...options });
  },

  // 检查 cookie 是否存在
  has(name: string): boolean {
    return cookies.get(name) !== undefined;
  },

  // 设置带过期时间的 cookie
  setWithExpiry(name: string, value: any, days: number): void {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + days);

    this.set(name, value, {
      expires: expiryDate,
    });
  },
};
