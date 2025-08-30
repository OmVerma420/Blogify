import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (type, message) => {
  const config = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    
  };

  if (type === "success") return toast.success(message, config);
  if (type === "error") return toast.error(message, config);
  if (type === "info") return toast.info(message, config);
  if (type === "warning") return toast.warning(message, config);
  return toast(message, config);
};
