import Modal from "./ui/Modal";
import Button from "./ui/Button";
import Icon from "./ui/Icon";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <Icon
          name="AlertTriangle"
          size="lg"
          className="text-red-500 mx-auto mb-4"
        />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          حذف حساب کاربری
        </h3>
        <p className="text-gray-600 mb-6">
          آیا مطمئن هستید که می‌خواهید حساب کاربری خود را حذف کنید؟ این عمل
          غیرقابل بازگشت است.
        </p>

        <div className="flex justify-center items-center gap-2">
          <Button
            title="انصراف"
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
          />
          <Button
            title="بله، حذف کن"
            onClick={handleConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAccountModal;
