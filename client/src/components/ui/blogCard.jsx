import React from "react";
import { Card, CardContent, CardHeader } from "./card";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { FaRegCalendarAlt } from "react-icons/fa";
import moment from "moment";
import { Link } from "react-router-dom";
import { RouteBlogDetails } from "@/helpers/routeName";

function BlogCard({ props }) {
  const user = useSelector((state) => state.user);

  return (
    <Link to={RouteBlogDetails(props.category.slug,props.slug)}>
       <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Avatar className="w-10 h-10">
              <AvatarImage src={props.featuredImage || ""} />
              <AvatarFallback>{props.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-base font-semibold">{props.author.name}</span>
          </div>
          {props.author.role === "admin" && (
            <Badge variant="outline" className="bg-violet-500 text-white px-3 py-1 rounded-full text-sm">
              Admin
            </Badge>
          )}
        </div>

        <CardHeader className="p-0 mb-2">
          <img
            src={props.featuredImage || "/placeholder-image.jpg"}
            alt={props.title}
            className="w-full h-56 object-cover rounded-md"
          />
        </CardHeader>

        <div className="flex items-center text-sm text-gray-500 mb-2">
          <FaRegCalendarAlt className="mr-1" />
          <span>{moment(props.createdAt).format('DD-MM-YYYY')}</span>
        </div>

        <h2 className="text-2xl font-bold line-clamp-2 mb-2 hover:text-blue-600 transition-colors">
          <Link to={`/blog/${props.slug}`}>{props.title}</Link>
        </h2>

      </CardContent>
    </Card>
    </Link>
  );
}

export default BlogCard;
