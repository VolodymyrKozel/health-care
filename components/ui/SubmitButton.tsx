import React from "react";
import { Button } from "./button";
import Image from "next/image";

interface Props {
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
}

function SubmitButton({ isLoading, children, className }: Props) {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? "shad-primary-btn w-full"}>
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src="/assets/icons/loader.svg"
            alt="loader"
            width={24}
            height={24}
            className="animate-spin"
          />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
}

export default SubmitButton;
