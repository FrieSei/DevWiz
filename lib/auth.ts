import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/constants";

export function checkAuth() {
  const { userId } = auth();

  if (!userId) {
    redirect(ROUTES.SIGN_IN);
  }

  return userId;
}