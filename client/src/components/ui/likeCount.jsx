import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { useFetch } from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";


function LikeCount({ blogId }) {
  const [like, setLike] = useState(0);
  const [hasLiked , setHasLiked] = useState(false)
  const user = useSelector((state) => state.user);
  const {
    data: blogLikeCount,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/auth/like/get-like-count/${blogId}`,
    {
      method: "get",
      credentials: "include",
    }
  );

  useEffect(() => {
    if (blogLikeCount?.data) {
      setLike(blogLikeCount.data.likeCount);
      setHasLiked(blogLikeCount.data.hasUserLiked)
    }
  }, [blogLikeCount]);

  const handleLike = async () => {
    try {
      if (!user.status) {
        return showToast("error", "Please login into your account");
      }
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/like/do-like`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ user: user.userData._id, blogId }),
        }
      );

      if (!response.ok) {
        showToast("error", response.statusText);
        return;
      }
      const responseData = await response.json();

      // Refetch the like data to update state
      const fetchResponse = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/like/get-like-count/${blogId}`,
        {
          method: "get",
          credentials: "include",
        }
      );
      if (fetchResponse.ok) {
        const fetchData = await fetchResponse.json();
        if (fetchData.data) {
          setLike(fetchData.data.likeCount);
          setHasLiked(fetchData.data.hasUserLiked);
        }
      }
    } catch (error) {
      showToast("error", error.message);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLike}
      className="flex justify-between items-center gap-1"
    >
      {hasLiked ?
      <FaHeart fill="red" />
      :
      <CiHeart />
      }
      {like}
    </button>
  );
}

export default LikeCount;
