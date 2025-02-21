import { toast, ToastOptions, Id } from 'react-toastify';

let activeToastId: Id | undefined; 

type ToastType = 'info' | 'success' | 'warning' | 'error';

const ShowToast = (message: string, type?: ToastType): void => {
  if (activeToastId !== undefined && toast.isActive(activeToastId)) {
    return; 
  }

  const toastOptions: ToastOptions = {
    autoClose: 2000,
    draggable: true,
  };

  // Display toast with appropriate type
  if (type && toast[type]) {
    activeToastId = toast[type](message, toastOptions);
  } else {
    activeToastId = toast(message, toastOptions);
  }
};

export default ShowToast;