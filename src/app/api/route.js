import OpenAI from "openai";
import { NextResponse } from "next/server";

// Initialize the OpenAI client using your environment variables.
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
    try {
        // Parse the incoming JSON payload.
        const { question } = await request.json();

        // If no question is provided, return a 400 error.
        if (!question) {
            return NextResponse.json(
                { error: "No question provided in request body." },
                { status: 400 }
            );
        }

        // Call the chat completions endpoint with the provided question.
        const response = await openai.chat.completions.create({
            model: "anthropic.claude-3.5-haiku",
            messages: [
                { role: "system", content: "I am writing a research paper. The current paper is below:" +
                        "The Impact of Artificial Intelligence on Modern Society\n" +
                        "\n" +
                        "In recent years, artificial intelligence has made significant changes to how we live and work. The technology has been implemented across various industries, from healthcare to transportation.\n" +
                        "\n" +
                        "The rapid advancement of AI technology has led to numerous breakthroughs in machine learning algorithms and neural networks, which have revolutionized the way computers process and analyze large amounts of data, making it possible to solve increasingly complex problems.\n" +
                        "\n" +
                        "AI systems do many important tasks in our daily lives. They are being used to predict weather patterns, diagnose diseases, and even drive cars." },
                { role: "user", content: question },
            ],
            max_tokens: 150, // Adjust as needed for longer responses
            temperature: 0.7,
        });

        // Ensure we have a valid response from OpenAI.
        if (!response.choices || response.choices.length === 0) {
            throw new Error("No response received from the OpenAI API.");
        }

        // Extract and trim the answer from the response.
        const answer = response.choices[0].message.content.trim();

        // Return the answer as JSON.
        return NextResponse.json({ answer });
    } catch (error) {
        console.error("Error during API call:", error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
