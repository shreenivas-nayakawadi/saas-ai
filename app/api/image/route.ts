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
            const { prompt } = body;

            if (!prompt) {
                  return NextResponse.json(
                        { error: "Prompt is required" },
                        { status: 400 }
                  );
            }

            // Use the image generation model
            const model = genAI.getGenerativeModel({
                  model: "gemini-pro-vision", // Model for image generation
            });

            // Generate image from text prompt
            const result = await model.generateContent({
                  contents: [
                        {
                              role: "user",
                              parts: [
                                    {
                                          text: `Generate a high-quality image based on this description: ${prompt}. 
          The image should be photorealistic if describing real-world objects,
          or stylized according to any specified art style in the prompt.`,
                                    },
                              ],
                        },
                  ],
            });

            const response = await result.response;

            // Get the generated image (Google's API returns image as base64)
            const imageData =
                  response.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!imageData) {
                  throw new Error("No image data received from the API");
            }

            return NextResponse.json({
                  imageUrl: imageData, // Base64 encoded image or URL
                  prompt: prompt,
                  timestamp: new Date().toISOString(),
            });
      } catch (error: any) {
            console.error("[IMAGE_GENERATION_ERROR]", error);

            if (error?.status === 404) {
                  return NextResponse.json(
                        {
                              error: "Model not found",
                              details: "The image generation model is not available",
                        },
                        { status: 404 }
                  );
            }

            if (
                  error?.errorDetails?.some(
                        (e: any) => e.reason === "API_KEY_INVALID"
                  )
            ) {
                  return NextResponse.json(
                        { error: "Invalid API key" },
                        { status: 401 }
                  );
            }

            return NextResponse.json(
                  {
                        error: "Image generation failed",
                        details: error.message || "Unknown error",
                        suggestion:
                              "Try modifying your prompt or try again later",
                  },
                  { status: 500 }
            );
      }
}
