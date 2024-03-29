"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";
import Loader from "./Loader";

import { IoMdClose } from "react-icons/io";

import { debounce } from "@utils/debounce";

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
  const [isLoadingData, setIsLoadingData] = useState(false);

  useEffect(() => {
    let delayDebounceFn;

    const fetchPostsByKeywords = async () => {
      try {
        setIsLoadingData(true);

        const response = await fetch(`/api/prompt`, {
          method: "POST",
          body: JSON.stringify({
            keywords: searchText,
          }),
        });

        const data = await response.json();

        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingData(false);
      }
    };

    const debouncedSearch = debounce(fetchPostsByKeywords, 400);

    if (searchText) {
      delayDebounceFn = setTimeout(debouncedSearch, 400);
    } else {
      fetchPostsByKeywords();
    }

    return () => clearTimeout(delayDebounceFn);
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
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
            }
          }}
        />

        <div className="absolute top-0 right-0 bottom-0 flex items-center pr-3">
          {searchText && (
            <IoMdClose
              onClick={() => setSearchText("")}
              className="cursor-pointer hover:text-orange-500"
            />
          )}
        </div>
        <div className="absolute top-0 left-0 bottom-0 flex items-center pl-2">
          {isLoadingData && <Loader height={25} width={25} />}
        </div>
      </form>

      <PromptCardList data={posts} handleTagClick={setSearchText} />
    </section>
  );
};

export default Feed;
