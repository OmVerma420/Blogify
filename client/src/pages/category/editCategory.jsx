import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import { RouteCategoryDetails } from "@/helpers/RouteNames.js";
import { Loading } from "@/components/ui/loading";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { triggerRefresh } from "@/redux/category/category.slice";

function EditCategory() {

  const navigate = useNavigate();
  const location = useLocation();
  const categoryId = location.state?.categoryId;
  const dispatch = useDispatch();

  const formSchema = z.object({
    name: z.string().min(2, "Name should be atleast two character long"),
    slug: z.string().min(3, "Slug should be atleast three character long"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const { data: categoryData, loading: categoryLoading, error: categoryError } = useFetch(
    categoryId ? `${getEnv("VITE_API_BASE_URL")}/auth/category/show/${categoryId}` : null,
    { method: "get", credentials: "include" },
    [categoryId]
  );

  useEffect(() => {
    if (categoryData?.data) {
      form.reset({
        name: categoryData.data.name || '',
        slug: categoryData.data.slug || '',
      });
    }
  }, [categoryData, form]);

  useEffect(() => {
    if (categoryError) {
      toast(categoryError.message);
    }
  }, [categoryError]);

  const categoryName = form.watch("name");
  useEffect(() => {
    if (categoryName && categoryName.trim().length >0) {
      const slug = slugify(categoryName, { lower: true });
      form.setValue("slug", slug);
    } else {
    form.setValue("slug", ""); // clear slug when name is empty
  }
  },[categoryName , form]);

  

  const onSubmit = async (values) => {
        try {
          const response = await fetch(
            `${getEnv("VITE_API_BASE_URL")}/auth/category/edit/${categoryId}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify(values),
            }
          );
          const data = await response.json();
          if (!response.ok) {
            showToast("error", data?.message);
            return;
          }
          form.reset()
          showToast("success", data?.message);
          dispatch(triggerRefresh());
          navigate(RouteCategoryDetails)
        } catch (error) {
          showToast("error", "Failed to update category. Please try again.");
        }
  };

  if (categoryLoading) return (
    <div>
      <Loading />
    </div>
  );

  if (categoryError) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-red-500">Error loading category: {categoryError.message}</p>
    </div>
  );

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 p-6">
      <Card className="w-full max-w-2xl shadow-xl rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            Edit Category
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter category name"
                        className="rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500 px-4 py-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1" />
                  </FormItem>
                )}
              />

              {/* Slug Field */}
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

              {/* Submit */}
              <Button
                type="submit"
                className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white py-3 text-lg font-medium"
              >
                Update
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default EditCategory;