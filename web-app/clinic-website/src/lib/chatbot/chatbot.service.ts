import OpenAI from "openai";

export class ChatbotService {
  private openai: OpenAI;
  private assistantId: string = "asst_Bi945yfvMXekx8OlzQUXewDl";
  private threadId: string | null = null;

  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not configured");
    }

    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      dangerouslyAllowBrowser: false,
    });
  }

  private async ensureThread() {
    if (!this.threadId) {
      const thread = await this.openai.beta.threads.create();
      this.threadId = thread.id;
    }
    return this.threadId;
  }

  async generateResponse(message: string): Promise<string> {
    try {
      // Ensure we have a thread
      const threadId = await this.ensureThread();

      // Add the user's message to the thread
      await this.openai.beta.threads.messages.create(threadId, {
        role: "user",
        content: message,
      });

      // Run the assistant
      const run = await this.openai.beta.threads.runs.create(threadId, {
        assistant_id: this.assistantId,
      });

      // Wait for the run to complete
      let runStatus = await this.openai.beta.threads.runs.retrieve(
        threadId,
        run.id
      );
      while (
        runStatus.status === "in_progress" ||
        runStatus.status === "queued"
      ) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
        runStatus = await this.openai.beta.threads.runs.retrieve(
          threadId,
          run.id
        );
      }

      if (runStatus.status === "failed") {
        throw new Error(
          `Assistant run failed: ${runStatus.last_error?.message || "Unknown error"}`
        );
      }

      // Get the latest message from the assistant
      const messages = await this.openai.beta.threads.messages.list(threadId, {
        limit: 1,
        order: "desc",
      });

      const assistantMessage = messages.data[0];
      if (!assistantMessage || assistantMessage.role !== "assistant") {
        throw new Error("No response from assistant");
      }

      // Get the text content from the message
      const content = assistantMessage.content[0];
      if (content.type !== "text") {
        throw new Error("Assistant response is not text");
      }

      return content.text.value;
    } catch (error) {
      console.error("Error generating chatbot response:", error);

      if (error instanceof Error) {
        if (error.message.includes("API key")) {
          throw new Error("OpenAI API key is invalid or not configured");
        } else if (error.message.includes("rate limit")) {
          throw new Error("Rate limit exceeded. Please try again in a moment.");
        } else if (error.message.includes("assistant")) {
          throw new Error(
            "Assistant configuration error. Please contact support."
          );
        }
      }

      throw new Error(
        `An error occurred while generating the response: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }
}
