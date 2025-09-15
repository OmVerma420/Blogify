import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import usericon from "@/assets/user.png";
import moment from "moment";
import { useSelector } from "react-redux";

function CommentList({ blogId, newComment }) {
  const user = useSelector((state) => state.user);
  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/auth/comment/get/${blogId}`,
    {
      method: "get",
      credentials: "include",
    }
  );

  if (loading) return <p className="text-gray-500">Loading comments...</p>;
  if (error) return <p className="text-red-500">Failed to load comments.</p>;

  return (
    <div className="mt-8">
      {/* Heading */}
      <h4 className="text-xl font-semibold mb-6 border-b pb-2">
        {newComment ? (
          <span>{data?.data.length + 1} Comments</span>
        ) : (
          <span>{data?.data.length} Comments</span>
        )}
      </h4>

      {/* New Comment (optimistic render) */}
      {newComment && (
        <div className="flex gap-3 mb-4 p-4 border rounded-xl bg-indigo-50 shadow-sm">
          <Avatar className="w-12 h-12 rounded-full overflow-hidden">
            <AvatarImage src={user.userData?.avatar || usericon} />
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold text-gray-800">{user?.userData.name}</p>
            <p className="text-xs text-gray-500 mb-1">
              {moment(newComment?.createdAt).format("DD MMM YYYY")}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {newComment?.comment}
            </p>
          </div>
        </div>
      )}

      {/* Old Comments */}
      <div className="space-y-4">
        {data?.data.length > 0 ? (
          data.data.map((comment) => (
            <div
              key={comment._id}
              className="flex gap-3 p-4 border rounded-xl shadow-sm hover:shadow-md transition bg-white"
            >
              <Avatar className="w-12 h-12 rounded-full overflow-hidden">
                <AvatarImage src={comment?.user.avatar || usericon} />
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">
                  {comment?.user.name}
                </p>
                <p className="text-xs text-gray-500 mb-1">
                  {moment(comment?.createdAt).format("DD MMM YYYY")}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {comment?.comment}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center italic">
            No comments yet. Be the first one 🚀
          </p>
        )}
      </div>
    </div>
  );
}

export default CommentList;
