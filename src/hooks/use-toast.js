import { toast } from "sonner";

export const useToast = () => {
  return {
    toast: (options) => {
      if (typeof options === 'string') {
        return toast(options);
      }
      
      if (options.variant === 'destructive') {
        return toast.error(options.description || options.title);
      }
      
      return toast(options.title, {
        description: options.description,
      });
    }
  };
};