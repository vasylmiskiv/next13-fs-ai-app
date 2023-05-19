"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
import Loader from "@components/Loader";

const ProfilePage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session]);

  useEffect(() => {
    setIsLoadingData(true);

    const fetchProfileData = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
      setIsLoadingData(false);
    };

    fetchProfileData();
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfimed = confirm("Are you sure you want to delete this prompt?");

    if (hasConfimed) {
      setIsLoadingData(true);

      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((p) => p._id !== post._id);

        setPosts(filteredPosts);
      } catch (err) {
        console.log(err);
      }

      setIsLoadingData(false);
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      isLoading={isLoadingData}
    />
  );
};

export default ProfilePage;
