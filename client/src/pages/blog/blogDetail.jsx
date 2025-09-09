import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { RouteAddBlog, RouteEditBlog } from "@/helpers/routeName";
import { showToast } from "@/helpers/showToast";
import { Loading } from "@/components/ui/loading";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import moment from "moment/moment";
import { deleteData } from "@/helpers/handledelete";

export function BlogDetails() {
  const [refreshData, setRefreshData] = useState(false);
  const {data: blogData, loading, error} = useFetch(`${getEnv("VITE_API_BASE_URL")}/auth/blog/all-blog`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData]
  );

  const handleDelete = async (blogId) => {
    const isDelete = await deleteData(
      `${getEnv("VITE_API_BASE_URL")}/auth/blog/delete`,
      blogId
    );

    if (isDelete) {
      setRefreshData(!refreshData);
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
              <Link to={RouteAddBlog}>Add Blog</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Dated</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogData && blogData?.data?.length > 0 ? (
                blogData.data.map((blog) => (
                  <TableRow key={blog?._id}>
                    <TableCell>{blog?.author?.name}</TableCell>
                    <TableCell>{blog?.category?.name}</TableCell>
                    <TableCell>{blog?.title}</TableCell>
                    <TableCell>{blog?.slug}</TableCell>
                    <TableCell>{moment(blog?.createdAt).format('DD-MM-YYYY')}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        variant="outline"
                        className="hover:bg-violet-400 hover:text-white"
                        asChild
                      >
                        <Link
                          to={RouteEditBlog}
                          state={{ blogId: blog._id }}
                        >
                          <FaRegEdit />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="hover:bg-red-400 hover:text-white"
                        onClick={() => handleDelete(blog._id)}
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

export default BlogDetails;
