import { connectToDB } from "@utils/db";
import Prompt from "@models/prompt";

export const GET = async (req) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("author");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch the prompts", { status: 500 });
  }
};
