import { connectToDB } from "@utils/db";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("author");

    if (!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (err) {
    return new Response("Failed to fetch the prompt", {
      status: 500,
    });
  }
};

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();

    const promptToUpdate = await Prompt.findById(params.id).populate("author");

    if (!promptToUpdate)
      return new Response("Prompt doesn't exist", { status: 404 });

    promptToUpdate.prompt = prompt;
    promptToUpdate.tag = tag;

    await promptToUpdate.save();

    return new Response(JSON.stringify(promptToUpdate), { status: 200 });
  } catch (err) {
    return new Response("Failed to update the prompt", {
      status: 500,
    });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    const promptToRemove = await Prompt.findByIdAndRemove(params.id);

    if (!promptToRemove)
      return new Response("Prompt doesn't exist", { status: 404 });

    return Response("The prompt deleted successfuly ", { status: 200 });
  } catch (err) {
    return new Response("Failed to delete the prompt", {
      status: 500,
    });
  }
};
