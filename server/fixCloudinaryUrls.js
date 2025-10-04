import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./src/models/user.model.js";
import { Blog } from "./src/models/blog.model.js";

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  console.error("MONGODB_URL is not defined in .env");
  process.exit(1);
}

async function fixUrls() {
  try {
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Fix User avatars
    const users = await User.find({
      avatar: { $regex: "http://res.cloudinary.com" },
    });

    console.log(`Found ${users.length} users with HTTP avatar URLs`);

    for (const user of users) {
      let avatar = user.avatar.trim();
      // Remove quotes if any
      avatar = avatar.replace(/^["']|["']$/g, "");
      if (avatar.includes("http://res.cloudinary.com")) {
        const fixedUrl = avatar.replace("http://", "https://");
        user.avatar = fixedUrl;
        await user.save();
        console.log(`Updated User ${user._id} avatar URL: ${avatar} -> ${fixedUrl}`);
      }
    }

    // Fix Blog featuredImage
    const blogs = await Blog.find({
      featuredImage: { $regex: "http://res.cloudinary.com" },
    });

    console.log(`Found ${blogs.length} blogs with HTTP featuredImage URLs`);

    for (const blog of blogs) {
      let featuredImage = blog.featuredImage.trim();
      // Remove quotes if any
      featuredImage = featuredImage.replace(/^["']|["']$/g, "");
      if (featuredImage.includes("http://res.cloudinary.com")) {
        const fixedUrl = featuredImage.replace("http://", "https://");
        blog.featuredImage = fixedUrl;
        await blog.save();
        console.log(`Updated Blog ${blog._id} featuredImage URL: ${featuredImage} -> ${fixedUrl}`);
      }
    }

    console.log("URL fix completed.");
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error fixing URLs:", error);
    process.exit(1);
  }
}

fixUrls();
