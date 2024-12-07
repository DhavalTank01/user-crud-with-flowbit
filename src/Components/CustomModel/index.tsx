import { Modal } from "flowbite-react";
import CustomButton from "../Button";
import { classNames } from "../../utils";

interface CustomModelProps {
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
  isShow: boolean;
  modelDetails: any;
  approveButtonText?: string;
  rejectButtonText?: string;
  approveButtonColor?: string;
  rejectButtonColor?: string;
  typeColorClass?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
  isError?: boolean;
}

const CustomModel = ({
  onClose,
  onApprove,
  onReject,
  isShow,
  modelDetails,
  approveButtonText = "Yes",
  rejectButtonText = "No",
  approveButtonColor = "",
  rejectButtonColor = "light",
  typeColorClass = "",
  children,
  isLoading = false,
  isError = false,
}: CustomModelProps) => {
  return (
    <Modal show={isShow} onClose={isLoading ? undefined : onClose}>
      <Modal.Header>
        <span className={classNames("font-bold", typeColorClass)}>
          {modelDetails?.title}
        </span>
      </Modal.Header>
      {children}
      <Modal.Footer>
        <CustomButton
          isLoading={isLoading}
          color={approveButtonColor}
          onClick={onApprove}
          disabled={isError || isLoading}
        >
          {approveButtonText}
        </CustomButton>
        <CustomButton
          disabled={isLoading}
          color={rejectButtonColor}
          onClick={onReject}
        >
          {rejectButtonText}
        </CustomButton>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModel;
