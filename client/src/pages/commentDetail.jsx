import { Card, CardContent } from '@/components/ui/card';
import { Loading } from '@/components/ui/loading';
import { getEnv } from '@/helpers/getEnv';
import { deleteData } from '@/helpers/handledelete';
import { useFetch } from '@/hooks/useFetch';
import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import { showToast } from '@/helpers/showToast';

function Comment() {
  const [refreshData, setRefreshData] = useState(false);
  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/auth/comment/get-all-comments`,
    { method: "get", credentials: "include" },
    [refreshData]
  );

  const handleDelete = async (id) => {
    const isDelete = await deleteData(
      `${getEnv("VITE_API_BASE_URL")}/auth/comment/delete-comment/${id}`
    );

    if (isDelete) {
      setRefreshData(!refreshData);
      showToast("success", "Comment deleted successfully");
    } else {
      showToast("error", "Failed to delete comment");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Card className="shadow-lg border border-gray-200">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
             Manage Comments
          </h2>

          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="font-semibold text-gray-700">Blog</TableHead>
                <TableHead className="font-semibold text-gray-700">Comment By</TableHead>
                <TableHead className="font-semibold text-gray-700">Comment</TableHead>
                <TableHead className="font-semibold text-gray-700 text-center">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data && data.data.length > 0 ? (
                data.data.map((comment) => (
                  <TableRow
                    key={comment._id}
                    className="hover:bg-violet-50 transition-colors"
                  >
                    <TableCell className="font-medium text-gray-800">
                      {comment?.blogId?.title}
                    </TableCell>
                    <TableCell>{comment?.user?.name}</TableCell>
                    <TableCell className="text-gray-600">
                      {comment?.comment}
                    </TableCell>
                    <TableCell className="flex justify-center">
                      <Button
                        size="sm"
                        variant="outline"
                        className="hover:bg-red-500 hover:text-white rounded-full"
                        onClick={() => handleDelete(comment._id)}
                      >
                        <FaRegTrashAlt />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="4" className="text-center py-6 text-gray-500">
                    😕 No comments found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default Comment;
