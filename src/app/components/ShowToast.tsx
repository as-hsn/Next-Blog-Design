  import { toast, ToastOptions} from "react-toastify";


  type ToastType = "info" | "success" | "warning" | "error";

  const ShowToast = (message: string, type?: ToastType): void => {

    const toastOptions: ToastOptions = {
      autoClose: 2000,
      draggable: true,
      className: "custom-toast",
    };

    if (type && ["info", "success", "warning", "error"].includes(type)) {
      toast[type](message, toastOptions);
    } else {
      toast(message, toastOptions);
    }    

  };

  export default ShowToast;