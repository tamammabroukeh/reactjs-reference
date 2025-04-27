import { Suspense } from "react";
import LoadingSpinner from "./loading";
import { IChildren } from "../../interfaces/shared";
const SuspenseFallback = ({ children }: IChildren) => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <LoadingSpinner />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};
export default SuspenseFallback;
