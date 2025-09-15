import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { useFetch } from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { useSelector } from "react-redux";

function LikeCount({ blogId }) {
  const [like, setLike] = useState(0);
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
    if (blogLikeCount) {
      setLike(blogLikeCount.data);
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
      }
      const responseData = await response.json();
      setLike(responseData.data);
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
      <AiOutlineLike />
      {like}
    </button>
  );
}

export default LikeCount;
