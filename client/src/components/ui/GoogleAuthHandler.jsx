import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRedirectResult } from 'firebase/auth'
import { auth } from '../../helpers/firebase'
import { showToast } from '../../helpers/showToast'
import { getEnv } from '../../helpers/getEnv'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/user/user.slice'
import { RouteIndex } from '../../helpers/RouteNames.js'

function GoogleAuthHandler() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const user = result.user;
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
            showToast("error", data?.message || "Login failed");
            return;
          }
          showToast("success", data?.message || "Login successful");
          dispatch(setUser(data.data.user));
          navigate(RouteIndex);
        }
      } catch (error) {
        showToast("error", "Google login failed");
      }
    };
    handleRedirectResult();
  }, [dispatch, navigate]);

  return null; // This component doesn't render anything
}

export default GoogleAuthHandler;
