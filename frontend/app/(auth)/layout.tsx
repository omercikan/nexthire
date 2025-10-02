import { LayoutComponentProps } from "@/shared/types";
import { Toaster } from "react-hot-toast";

export default function AuthLayout({ children }: LayoutComponentProps) {
  return (
    <div suppressHydrationWarning>
      <Toaster position="top-right" reverseOrder={false} />

      {children}
    </div>
  );
}
