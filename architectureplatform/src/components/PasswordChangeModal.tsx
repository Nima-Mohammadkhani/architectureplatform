import { useState } from "react";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import Input from "./ui/Input";

interface PasswordChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (oldPassword: string, newPassword: string) => void;
}

const PasswordChangeModal: React.FC<PasswordChangeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: string, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = () => {
    const newErrors: { [key: string]: string } = {};

    if (!passwordData.oldPassword) {
      newErrors.oldPassword = "رمز عبور فعلی الزامی است";
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = "رمز عبور جدید الزامی است";
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = "رمز عبور جدید باید حداقل ۶ کاراکتر باشد";
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "تکرار رمز عبور جدید الزامی است";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "رمز عبور جدید و تکرار آن یکسان نیستند";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(passwordData.oldPassword, passwordData.newPassword);
      resetForm();
    }
  };

  const resetForm = () => {
    setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        تغییر رمز عبور
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            رمز عبور فعلی
          </label>
          <Input
            type="password"
            value={passwordData.oldPassword}
            onChange={(e) => handleInputChange("oldPassword", e.target.value)}
            className={`w-full ${
              errors.oldPassword ? "border-red-300" : "border-gray-300"
            }`}
          />
          {errors.oldPassword && (
            <p className="text-red-600 text-sm mt-1">{errors.oldPassword}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            رمز عبور جدید
          </label>
          <Input
            type="password"
            value={passwordData.newPassword}
            onChange={(e) => handleInputChange("newPassword", e.target.value)}
            className={`w-full ${
              errors.newPassword ? "border-red-300" : "border-gray-300"
            }`}
          />
          {errors.newPassword && (
            <p className="text-red-600 text-sm mt-1">{errors.newPassword}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            تکرار رمز عبور جدید
          </label>
          <Input
            type="password"
            value={passwordData.confirmPassword}
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
            className={`w-full ${
              errors.confirmPassword ? "border-red-300" : "border-gray-300"
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 mt-6">
        <Button
          title="انصراف"
          onClick={handleClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
        />
        <Button
          title="تغییر رمز عبور"
          onClick={handleSubmit}
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-colors"
        />
      </div>
    </Modal>
  );
};

export default PasswordChangeModal;
