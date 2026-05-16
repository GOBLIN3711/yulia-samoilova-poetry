import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !message) {
      return NextResponse.json(
        { success: false, error: "Name and message are required" },
        { status: 400 }
      );
    }

    // Log the feedback (we'll add email sending later)
    console.log("New feedback received:", { name, email, message, timestamp: new Date().toISOString() });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}
