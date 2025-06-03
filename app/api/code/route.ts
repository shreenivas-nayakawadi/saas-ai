import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = process.env.GOOGLE_API_KEY
      ? new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)
      : null;

const LANGUAGES = [
      "javascript",
      "typescript",
      "python",
      "java",
      "csharp",
      "cpp",
      "go",
      "ruby",
      "php",
      "swift",
      "kotlin",
      "rust",
      "scala",
      "dart",
      "r",
      "bash",
];

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

            if (
                  !messages ||
                  !Array.isArray(messages) ||
                  messages.length === 0
            ) {
                  return NextResponse.json(
                        { error: "Invalid messages format" },
                        { status: 400 }
                  );
            }

            const lastUserMessage = messages[messages.length - 1].parts[0].text;

            let detectedLanguage = "typescript";
            const lowerPrompt = lastUserMessage.toLowerCase();
            for (const lang of LANGUAGES) {
                  if (lowerPrompt.includes(lang)) {
                        detectedLanguage = lang;
                        break;
                  }
            }

            const model = genAI.getGenerativeModel({
                  model: "gemini-1.5-flash",
                  generationConfig: {
                        responseMimeType: "text/plain",
                        temperature: 0.3,
                  },
            });

            const prompt = `
You are a code generation assistant. Generate ${detectedLanguage} code based on the following request:
"${lastUserMessage}"

Instructions:
- Only output the code
- Do not include markdown or backticks
- Format the code with proper indentation and line breaks
- Use minimal comments only when absolutely necessary
- Do NOT minify the code
    `.trim();

            const result = await model.generateContent(prompt);
            const response = await result.response;
            let code = response.text();

            code = code
                  .replace(/```[\s\S]*?```/g, "") // Strip any code fences if returned
                  .trim();

            return NextResponse.json({ response: code });
      } catch (error) {
            console.error("[CODE_GENERATION_ERROR]", error);

            if ((error as { status?: number }).status === 404) {
                  return NextResponse.json(
                        {
                              error: "Model not found. Please ensure 'gemini-1.5-flash' is available",
                              details: (error as { message?: string }).message,
                        },
                        { status: 404 }
                  );
            }

            if (
                  (error as { errorDetails?: Array<{ reason?: string }> }).errorDetails?.some(
                        (e) => e.reason === "API_KEY_INVALID"
                  )
            ) {
                  return NextResponse.json(
                        { error: "Invalid Google API key" },
                        { status: 401 }
                  );
            }

            return NextResponse.json(
                  {
                        error: "Internal Server Error",
                        details: (error as { message?: string }).message || "Unknown error",
                  },
                  { status: 500 }
            );
      }
}
