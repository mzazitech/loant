import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  const formData = await request.formData();
  const depositAmount = Number(formData.get("depositAmount"));

  if (!Number.isFinite(depositAmount) || depositAmount < 250) {
    return NextResponse.json(
      { error: "Minimum membership deposit is KES 250." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    message: "Connect this route to Paystack transaction initialization.",
    amount: depositAmount,
    currency: "KES",
    callbackUrl: "/paystack/callback"
  });
}
