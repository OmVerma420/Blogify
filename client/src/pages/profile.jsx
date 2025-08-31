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
import { email, z } from "zod";
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

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [filePreview, setPreview] = useState(null);//just to show UI before saving.
  const [avatar, setAvatar] = useState(null); //actual file to send to backend

  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/auth/get-user`,
    { method: "get", credentials: "include" }
  );

  // form schema
  const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email(),
    bio: z.string().min(3, "Bio must at least 3 character long").optional(),
    password: z.string(),
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
      formData.append("avatar", avatar);
      formData.append("data", JSON.stringify(values));

      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/update-profile`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        showToast("error", data?.message);
        return;
      }

      showToast("success", data?.message);
      dispatch(setUser(data.data.user)); // <-- user gets stored in redux
    } catch (error) {
      showToast("error", error?.message );
    }
  };

  const handleFileSelection = (files) => {
    const file = files[0];
    setAvatar(file);
    const preview = URL.createObjectURL(file);
    setPreview(preview);
    
  }

  if (loading)
    return (
      <div>
        <Loading />{" "}
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        {/* Card */}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Gradient header like profile UI */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-24"></div>

          <div className="px-6 pb-6 relative -mt-12 flex flex-col items-center overflow-hidden">
            {/* Avatar */}
            <Dropzone onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />

                  <Avatar className="w-24 h-24 border-4 border-white shadow-md ">
                    <AvatarImage src={filePreview? filePreview :user?.userData?.avatar} />

                    <AvatarFallback className="text-2xl bg-gray-200">
                      {user?.userData?.name?.charAt(0) || "U"}{" "}
                    </AvatarFallback>

                    <div className="absolute bottom-0 right-0 flex items-center justify-center w-9 h-9 bg-white rounded-full shadow-md opacity-80 hover:opacity-100 transition duration-300 cursor-pointer">
                      <FaCamera />
                    </div>
                  </Avatar>

                </div>
              )}
            </Dropzone>

            {/* Heading */}
            <h2 className="mt-4 text-xl font-bold text-gray-900">
              Welcome Back
            </h2>

            {/* Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5 w-full"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your name"
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter bio" {...field} />
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
