import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  const formData = await request.formData();
  const sourceOfIncome = formData.get("sourceOfIncome");
  const monthlyIncome = Number(formData.get("monthlyIncome"));

  if (!sourceOfIncome || !Number.isFinite(monthlyIncome)) {
    return NextResponse.json(
      { error: "Source of income and monthly income are required." },
      { status: 400 }
    );
  }

  return NextResponse.redirect(new URL("/membership", request.url));
}
