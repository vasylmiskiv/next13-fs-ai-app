"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("");

  const { data: session } = useSession();
  const pathName = usePathname();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer ">
          <Image
            loader={() => post?.author?.image}
            src={post?.author?.image}
            alt="user"
            unoptimized={true}
            width={40}
            height={40}
            className="rounded-full object-contain
          "
          />
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900">
              {post?.author?.username}
            </h3>
            <p className="text-sm text-gray-500">{post?.author?.email}</p>
          </div>
        </div>

        <div className="copy_btn" onClick={() => handleCopy()}>
          <Image
            src={
              copied === post.prompt
                ? "assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
            alt="author"
          />
        </div>
      </div>

      <p className="my-4 text-sm text-gray-700">{post.prompt}</p>

      <div className="flex">
        {post.tag.split(",").map((tag) => (
          <div
            key={tag}
            className="text-sm text-blue-500 mr-2 hover:underline cursor-pointer"
            onClick={() => handleTagClick(tag.trim())}
          >
            #{tag.trim()}
          </div>
        ))}
      </div>

      {session?.user.id === post.author?._id && pathName === "/profile" && (
        <div className="flex flex-end items-center mt-5 gap-5 border-t pt-3">
          <p
            className="text-sm bg-green-400 text-white cursor-pointer border py-1 px-3 rounded-lg hover:bg-green-600 transition-all delay-50"
            onClick={handleEdit}
          >
            Edit
          </p>
          <div className="border bg-red-200 py-1 px-4 rounded-lg cursor-pointer hover:bg-red-400 transition-all delay-50">
            <Image
              src="/assets/icons/trash.svg"
              width={19}
              height={19}
              onClick={handleDelete}
              color="green"
              alt="trash"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
