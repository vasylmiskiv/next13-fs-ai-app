import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left left max-w-md">{type} and share</p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            required
            className="form_textarea resize-none"
          ></textarea>
        </label>
        <label htmlFor="">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag
          </span>
          <div className="flex items-center gap-2">
            <span className="ml-2 pt-2 text-lg text-gray-400">#</span>
            <input
              value={post.tag}
              onChange={(e) => setPost({ ...post, tag: e.target.value })}
              placeholder="product, webdev, ideas"
              required
              className="form_input"
            />
          </div>
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-orange-500 rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
