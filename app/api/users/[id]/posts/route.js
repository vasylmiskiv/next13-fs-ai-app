import { connectToDB } from "@utils/db";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({ author: params.id }).populate("author");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch the prompts", { status: 500 });
  }
};
