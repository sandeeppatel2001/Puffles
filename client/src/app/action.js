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
export async function gotoDetails(id) {
  revalidatePath("/");
  redirect(`/id/${id}`);
}
