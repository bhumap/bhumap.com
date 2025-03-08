"use server";
import { cookies } from "next/headers";


export async function getCookies(key) {
    const token = await cookies();
   return token.get(key);
}

export async function removeCookies(key) {
    const token = await cookies();
    token.delete(key);
}