"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function gotoDisplay() {
  revalidatePath("/");
  redirect("/");
}

export async function gotoForm() {
  revalidatePath("/");
  redirect("/form");
}
