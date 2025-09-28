import { Card, CardContent } from "@/components/ui/card";
import { Loading } from "@/components/ui/loading";
import { getEnv } from "@/helpers/getEnv";
import { deleteData } from "@/helpers/handledelete";
import { useFetch } from "@/hooks/useFetch";
import React, { useState } from "react";
import userIcon from "../assets/user.png";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { showToast } from "@/helpers/showToast";
import moment from "moment";

function Users() {
  const [refreshData, setRefreshData] = useState(false);
  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/auth/user/get-all-user`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData]
  );

  const handleDelete = async (id) => {
    const isDelete = await deleteData(
      `${getEnv("VITE_API_BASE_URL")}/auth/user/delete-user/${id}`
    );

    if (isDelete) {
      setRefreshData(!refreshData);
      showToast("success", "User deleted");
    } else {
      showToast("error", "Failed to delete user");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="p-6">
      <Card className="shadow-lg rounded-2xl border border-gray-200">
        <CardContent>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Users</h2>
          <Table className="w-full border rounded-lg overflow-hidden">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="text-gray-700">Role</TableHead>
                <TableHead className="text-gray-700">Name</TableHead>
                <TableHead className="text-gray-700">Email</TableHead>
                <TableHead className="text-gray-700">Avatar</TableHead>
                <TableHead className="text-gray-700">Joined</TableHead>
                <TableHead className="text-gray-700 text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.data.length > 0 ? (
                data.data.map((user, index) => (
                  <TableRow
                    key={user._id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <TableCell>
                      <span
                        className={`px-3 py-1 text-sm rounded-full font-medium ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {user?.role}
                      </span>
                    </TableCell>
                    <TableCell className="font-medium">{user?.name}</TableCell>
                    <TableCell className="text-gray-600">{user?.email}</TableCell>
                    <TableCell>
                      <img
                        src={user?.avatar || userIcon}
                        alt={user?.name}
                        className="w-10 h-10 rounded-full border border-gray-200 object-cover"
                      />
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {moment(user.createdAt).format("DD MMM YYYY")}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="hover:bg-red-500 hover:text-white rounded-full"
                        onClick={() => handleDelete(user._id)}
                      >
                        <FaRegTrashAlt />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="6" className="text-center py-6 text-gray-500">
                    No users found
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

export default Users;
