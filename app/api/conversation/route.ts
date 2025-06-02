import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = process.env.GOOGLE_API_KEY 
  ? new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)
  : null;

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!genAI) {
      return NextResponse.json(
        { error: "Google API key not configured" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    // Use gemini-1.5-flash model with plain text output
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "text/plain"
      }
    });
    
    // Convert messages to Google's format
    const history = messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.parts[0].text }],
    }));

    const chat = model.startChat({
      history: history,
    });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.parts[0].text);
    const response = await result.response;
    const text = response.text();

    // Return plain text response without any formatting
    return NextResponse.json({
      response: text.replace(/\*\*/g, ''), // Remove any remaining ** markers
    });
  } catch (error: any) {
    console.error("[CONVERSATION_ERROR]", error);
    
    if (error?.status === 404) {
      return NextResponse.json(
        { 
          error: "Model not found. Please ensure gemini-1.5-flash is available in your region or API tier.",
          details: error.message
        },
        { status: 404 }
      );
    }

    if (error?.errorDetails?.some((e: any) => e.reason === "API_KEY_INVALID")) {
      return NextResponse.json(
        { error: "Invalid Google API key" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { 
        error: error.message || "Internal Server Error",
        ...(error.response?.data ? { details: error.response.data } : {})
      },
      { status: 500 }
    );
  }
}