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
  isLoading?: boolean;
}

const ConfirmModel = ({
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
  isLoading = false,
}: CustomModelProps) => {
  return (
    <Modal show={isShow} onClose={isLoading ? undefined : onClose}>
      <Modal.Header>
        Are you want to{" "}
        <span className={classNames("font-bold", typeColorClass)}>
          {modelDetails?.type}
        </span>
        ?
      </Modal.Header>
      <Modal.Footer>
        <CustomButton
          isLoading={isLoading}
          color={approveButtonColor}
          onClick={onApprove}
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

export default ConfirmModel;
