import { toast } from "../components/Toast/core/toast";

export function successToast() {
  toast.success({title: "Success caled inside native function", autoClose: 3000});
}