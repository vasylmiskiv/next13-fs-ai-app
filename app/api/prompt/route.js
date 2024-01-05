import { connectToDB } from "@utils/db";
import Prompt from "@models/prompt";

export const GET = async () => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("author");

    if (!prompts || prompts.length === 0) {
      return new Response("No prompts found", { status: 404 });
    }

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch the prompts", { status: 500 });
  }
};

export const POST = async (req) => {
  const { keywords } = await req.json();

  try {
    await connectToDB();

    const promptsByKeywords = await Prompt.find({
      $or: [
        { prompt: { $regex: keywords, $options: "i" } },
        { tag: { $regex: keywords, $options: "i" } },
      ],
    }).populate("author");

    return new Response(JSON.stringify(promptsByKeywords), { status: 200 });
  } catch (error) {
    return new Response(`Failed to fetch the prompts. ${error}`, {
      status: 500,
    });
  }
};
