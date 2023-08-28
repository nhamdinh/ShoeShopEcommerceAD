import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { ToastObjects } from "../../utils/constants";
import { useSelector } from "react-redux";
import {
  getToastContent,
  getToastOpen,
  getToastStep,
} from "../../store/selector/RootSelector";

const Toast = () => {
  const open = useSelector(getToastOpen);
  const step = useSelector(getToastStep);
  const content = useSelector(getToastContent);

  useEffect(() => {
    if (step === 1) {
      toast.success(content, ToastObjects);
    }
    if (step === 2) {
      toast.error(content, ToastObjects);
    }
  }, [open]);

  return (
    <div>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
};

export default Toast;
