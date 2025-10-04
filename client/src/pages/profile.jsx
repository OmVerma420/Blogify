import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getEnv } from "@/helpers/getEnv";
import { zodResolver } from "@hookform/resolvers/zod";
import { showToast } from "@/helpers/showToast";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea";
import { useFetch } from "@/hooks/useFetch";
import { setUser } from "../redux/user/user.slice.js";
import { Loading } from "@/components/ui/loading.jsx";
import { FaCamera } from "react-icons/fa";
import Dropzone from "react-dropzone";
import { z } from "zod";

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [filePreview, setPreview] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const { data, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/auth/get-user`,
    { method: "get", credentials: "include" }
  );

  // form schema
  const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email(),
    bio: z.string().min(3, "Bio must at least 3 character long").optional(),
    password: z.string().optional(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user?.userData) {
      form.reset({
        name: user?.userData?.name,
        email: user?.userData?.email,
        bio: user?.userData?.bio || "",
      });
    }
  }, []);

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      if (avatar) formData.append("avatar", avatar);
      formData.append("data", JSON.stringify(values));

      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/update-profile`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();
      if (!response.ok) return showToast("error", data?.message);

      showToast("success", data?.message);
      dispatch(setUser(data.data));
      setPreview(null);
      setAvatar(null);
    } catch (error) {
      showToast("error", "Failed to update profile. Please try again.");
    }
  };

  const handleFileSelection = (files) => {
    const file = files[0];
    setAvatar(file);
    const preview = URL.createObjectURL(file);
    setPreview(preview);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loading />
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-28"></div>

        {/* Avatar Section */}
        <div className="relative -mt-14 flex flex-col items-center px-6 pb-6">
          <Dropzone onDrop={handleFileSelection}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="relative group">
                <input {...getInputProps()} />
                <Avatar className="w-28 h-28 border-4 border-white shadow-lg">
                  <AvatarImage
                    src={filePreview ? filePreview : user?.userData?.avatar}
                  />
                  <AvatarFallback className="text-3xl bg-gray-200">
                    {user?.userData?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>

                <div className="absolute bottom-1 right-1 flex items-center justify-center w-9 h-9 bg-white rounded-full shadow-md opacity-90 group-hover:opacity-100 transition cursor-pointer">
                  <FaCamera className="text-gray-600" />
                </div>
              </div>
            )}
          </Dropzone>

          {/* Heading */}
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            {user?.userData?.name || "Your Name"}
          </h2>
          <p className="text-sm text-gray-500">{user?.userData?.email}</p>
        </div>

        {/* Form */}
        <div className="px-6 pb-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 w-full"
            >
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your name"
                        className="rounded-lg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className="rounded-lg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Bio */}
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write something about yourself..."
                        className="rounded-lg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        className="rounded-lg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Save Button */}
              <Button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 
                text-white font-semibold py-2.5 shadow-md transition-all duration-300"
              >
                Save Changes
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
