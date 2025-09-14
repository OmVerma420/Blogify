import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { MdOutlineComment } from "react-icons/md";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import { Textarea } from "./textarea";
import { useSelector } from "react-redux";
import { RouteSignIn } from "@/helpers/routeName";
import { Link } from "react-router-dom";
import CommentList from "./commentList";

function Comment({ blogId }) {
  const [newComment, setNewComment] = useState();
  const user = useSelector((state) => state.user);

  const formSchema = z.object({
    comment: z.string().min(2, "Comment should be at least 2 characters long"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const newValues = { ...values, blogId, author: user.userData._id };
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/comment/add`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(newValues),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        showToast("error", data?.message);
        return;
      }
      setNewComment(data.data);
      form.reset();
      showToast("success", data?.message);
    } catch (error) {
      showToast("error", error?.message);
    }
  };

  return (
    <div className="mt-10">
      <h4 className="flex items-center gap-2 text-2xl font-bold mb-6">
        <MdOutlineComment className="text-indigo-600" /> Comments
      </h4>

      {user && user.status ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mb-10"
          >
            {/* Comment Field */}
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-700">
                    Write a comment
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Type your comment..."
                      className="w-full rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm mt-1" />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              type="submit"
              className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 text-lg font-medium shadow-md"
            >
              Post Comment
            </Button>
          </form>
        </Form>
      ) : (
        <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Link to={RouteSignIn}>Sign In to Comment</Link>
        </Button>
      )}

      {/* Comment List */}
      <CommentList blogId={blogId} newComment={newComment} />
    </div>
  );
}

export default Comment;
