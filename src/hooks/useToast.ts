import toast from "react-hot-toast";

export type ToastType = "success" | "error" | "loading" | "default";

interface ToastOptions {
  duration?: number;
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
}

export const useToast = () => {
  const showSuccess = (message: string, options?: ToastOptions) => {
    toast.success(message, {
      duration: options?.duration ?? 4000,
      position: options?.position ?? "top-right",
    });
  };

  const showError = (message: string, options?: ToastOptions) => {
    toast.error(message, {
      duration: options?.duration ?? 5000,
      position: options?.position ?? "top-right",
    });
  };

  const showLoading = (message: string, options?: ToastOptions) => {
    return toast.loading(message, {
      position: options?.position ?? "top-right",
    });
  };

  const showDefault = (message: string, options?: ToastOptions) => {
    toast(message, {
      duration: options?.duration ?? 4000,
      position: options?.position ?? "top-right",
    });
  };

  const dismiss = (toastId?: string) => {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  };

  return {
    showSuccess,
    showError,
    showLoading,
    showDefault,
    dismiss,
  };
};
