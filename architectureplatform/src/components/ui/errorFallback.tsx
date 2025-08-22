import { ErrorFallbackProps } from "../../types/ui";

const ErrorFallback = ({ error }: ErrorFallbackProps) => {
  return (
    <div className="p-4 bg-red-100 text-red-700 shadow">
      <h2 className="font-bold text-lg">مشکلی در اجرای برنامه پیش آمد!</h2>
      <p className="mt-2">
        لطفاً در صورتی که مشکل ادامه داشت، با پشتیبانی تماس بگیرید.
      </p>
      <p className="mt-3 text-xs text-gray-600">
        کد خطا: <span className="font-mono">{error.message}</span>
      </p>
    </div>
  );
};

export default ErrorFallback;
