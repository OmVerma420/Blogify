import React, { useState } from "react";
import { Button } from "./button";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/helpers/firebase";
import { RouteIndex } from "@/helpers/RouteNames.js";
import { showToast } from "@/helpers/showToast";
import { useNavigate } from "react-router-dom";
import { getEnv } from "@/helpers/getEnv";
import { firebaseErrorMessages } from "@/helpers/firebaseErrorMessage";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice";

function GoogleLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (isLoading) return; // already running request
    setIsLoading(true);

    try {
      const googleResponse = await signInWithPopup(auth, provider);
      const user = googleResponse.user;

      const bodyData = {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };

      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/google-login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(bodyData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        showToast("error", data?.message || "Google login failed");
        return;
      }

      showToast("success", data?.message || "Google login successful");
      dispatch(setUser(data.data.user)) // Assuming the user data is in data.user
      navigate(RouteIndex);

    } catch (error) {
      const friendlyMessage =
      firebaseErrorMessages[error.code] ||
      error?.message ||
      "Something went wrong. Please try again.";
      showToast("error", friendlyMessage);
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      disabled={isLoading}
      className="w-full mb-4 flex items-center justify-center gap-2"
      onClick={handleLogin}
    >
      <FcGoogle />
      {isLoading ? "Please wait..." : "Continue with Google"}
    </Button>
  );
}

export default GoogleLogin;
