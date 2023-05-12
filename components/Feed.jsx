"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };

    if (!searchText) {
      fetchPosts();
    } else {
      const fetchPostsByKeywords = async () => {
        const response = await fetch(`/api/prompt`, {
          method: "POST",
          body: JSON.stringify({
            keywords: searchText,
          }),
        });

        const data = await response.json();

        setPosts(data);
      };

      const delayDebounceFn = setTimeout(() => {
        if (searchText) {
          fetchPostsByKeywords();
        }
      }, 1000);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchText]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search for a tag or a username"
          className="search_input"
        />
      </form>

      <PromptCardList data={posts} handleTagClick={() => console.log(123)} />
    </section>
  );
};

export default Feed;
