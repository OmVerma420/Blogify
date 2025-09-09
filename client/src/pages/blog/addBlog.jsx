import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import slugify from "slugify";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import Dropzone from "react-dropzone";
import Editor from "@/components/ui/Editor";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/user/user.slice";
import { useNavigate } from "react-router-dom";
import { RouteBlog } from "@/helpers/routeName";

function AddBlog() {

  const navigate = useNavigate();
  const [filePreview, setPreview] = useState(null);
  
  const [blogImg, setBlogImg] = useState(null);
  const user = useSelector((state) => state.user);
  const {
    data: categoryData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/auth/all-category`, {
    method: "get",
    credentials: "include",
  });

  const handleFileSelection = (files) => {
    const file = files[0];
    setBlogImg(file);
    const preview = URL.createObjectURL(file);
    setPreview(preview);
  };

  const formSchema = z.object({
    category: z
      .string()
      .min(2, "Category should be atleast two character long"),
    title: z.string().min(2, "Title should be atleast two character long"),
    slug: z.string().min(3, "Slug should be atleast three character long"),
    blogContent: z
      .string()
      .min(3, "Blog Content should be atleast three character long"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      title: "",
      slug: "",
      blogContent: "",
    },
  });

  const handleEditor = (event, editor) => {
    const data = editor.getData();
    form.setValue("blogContent", data);
  };

  const blogTitle = form.watch("title");
  useEffect(() => {
    if (blogTitle && blogTitle.trim().length > 0) {
      const slug = slugify(blogTitle, { lower: true });
      form.setValue("slug", slug);
    } else {
      form.setValue("slug", ""); // clear slug when name is empty
    }
  }, [blogTitle, form]);

  const onSubmit = async (values) => {
    try {
      const newValue = {...values , author: user._id}
      const formData = new FormData();
      if (blogImg) {
        formData.append("file", blogImg);
      }
      formData.append("data", JSON.stringify(newValue));

      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/blog/add`,
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
      form.reset()
      setBlogImg(null);
      setPreview(null);

      navigate(RouteBlog)
      showToast("success", data?.message);
      
    } catch (error) {
      showToast("error", error?.message);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 p-6">
      <Card className="w-full max-w-3xl shadow-xl rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            Add Category
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Name Field */}
              <div>
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-gray-700">
                        Category
                      </FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {categoryData &&
                              categoryData.data.length > 0 &&
                              categoryData.data.map((category) => (
                                <SelectItem
                                  key={category._id}
                                  value={category._id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm mt-1" />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-gray-700">
                        Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter blog title"
                          className="rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500 px-4 py-2"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm mt-1" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Slug Field */}
              <div>
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-gray-700">
                        Slug
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="auto-generated slug"
                          readOnly
                          className="rounded-xl border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed px-4 py-2"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm mt-1" />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <span>Featured Image</span>
                <Dropzone
                  onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div
                      {...getRootProps()}
                      className="bg-gray-100 rounded-lg "
                    >
                      <input
                        {...getInputProps()}
                        placeholder="Enter to select Img"
                      />
                      <div className="inline-block border-dashed border rounded bg-gray-100 max-w-xs">
                        {filePreview ? (
                          <img
                            src={filePreview}
                            alt="preview"
                            className="w-auto h-auto max-w-full max-h-40"
                          />
                        ) : (
                          <span className="text-gray-400 text-sm">Upload</span>
                        )}
                      </div>
                    </div>
                  )}
                </Dropzone>
              </div>

              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="blogContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-gray-700">
                        Blog Content
                      </FormLabel>
                      <FormControl>
                        <Editor
                          props={{ initialData: "", onChange: handleEditor }}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm mt-1" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white py-3 text-lg font-medium"
              >
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddBlog;
