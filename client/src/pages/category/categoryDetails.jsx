import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RouteAddCategory, RouteEditCategory } from "@/helpers/routeName.js";
import React from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import { Loading } from "@/components/ui/loading";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { showToast } from "@/helpers/showToast";
import { deleteData } from "@/helpers/handledelete";
import { useDispatch, useSelector } from "react-redux";
import { triggerRefresh } from "@/redux/category/category.slice";

function CategoryDetails() {

  const refresh = useSelector((state) => state.category.refresh);
  const dispatch = useDispatch();

  const {data: categoryData,loading,error,} = useFetch(`${getEnv("VITE_API_BASE_URL")}/auth/category/all`,
    {
      method: "get",
      credentials: "include",
    },
    [refresh]
  );
  const handleDelete = async (categoryId) => {
    const isDelete = await deleteData(
      `${getEnv("VITE_API_BASE_URL")}/auth/category/delete`,
      categoryId
    );

    if (isDelete) {
      dispatch(triggerRefresh());
      showToast("success", "Date deleted");
    } else {
      showToast("error", "Date not deleted");
    }
  };

  if (loading) return <Loading />;
  return (
    <div>
      <Card>
        <CardHeader>
          <div>
            <Button>
              <Link to={RouteAddCategory}>Add Category</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryData && categoryData.data.length > 0 ? (
                categoryData.data.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        variant="outline"
                        className="hover:bg-violet-400 hover:text-white"
                        asChild
                      >
                        <Link
                          to={RouteEditCategory}
                          state={{ categoryId: category._id }}
                        >
                          <FaRegEdit />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="hover:bg-red-400 hover:text-white"
                        onClick={() => handleDelete(category._id)}
                      >
                        <FaRegTrashAlt />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="3">Data not found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default CategoryDetails;
