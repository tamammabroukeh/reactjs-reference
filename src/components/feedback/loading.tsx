import Loading from "@/assets/loading-spinner.svg";
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <img alt="Loading..." src={Loading} />
    </div>
  );
};
export default LoadingSpinner;
