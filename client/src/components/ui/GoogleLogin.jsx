import React, { useState } from "react";
import { Button } from "./button";
import { FcGoogle } from "react-icons/fc";
import { signInWithRedirect, getRedirectResult } from "firebase/auth";
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
    if (isLoading) return;
    setIsLoading(true);

    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      const friendlyMessage =
      firebaseErrorMessages[error.code] ||
      error?.message ||
      "Something went wrong. Please try again.";
      showToast("error", friendlyMessage);
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
