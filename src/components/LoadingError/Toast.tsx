import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { ToastObjects } from "../../utils/constants";
const Toast = () => {

  // useEffect(() => {
  //   if (callDel.state === 1) {
  //     toast.success(`${callDel.value} Deleted`, ToastObjects);
  //   }
  //   if (callDel.state === 2) {
  //     toast.error(`Delete ${callDel.value} Failed`, ToastObjects);
  //   }
  // }, [callDel]);

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
