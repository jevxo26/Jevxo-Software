import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, message" },
        { status: 400 }
      );
    }

    // In production, integrate with Resend, SendGrid, Nodemailer, etc.
    // Example: await resend.emails.send({ from, to, subject, html });
    console.log("Contact form submission:", { name, email, message, ...body });

    return NextResponse.json(
      { success: true, message: "Message received! We'll be in touch within 24 hours." },
      { status: 200 }
    );
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
