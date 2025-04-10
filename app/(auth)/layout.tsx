import { LayoutComponentProps } from "@/types";
import { Toaster } from "react-hot-toast";

export default function AuthLayout({ children }: LayoutComponentProps) {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />

      {children}
    </div>
  );
}
