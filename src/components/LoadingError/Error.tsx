import React from "react";

const Message = ({ variant, mess }:any) => {
  return (
    <div className="d-flex justify-content-center col-12">
      <div className={`alert ${variant}`}>{mess}</div>
    </div>
  );
};

Message.defaultProps = {
  variant: "alert-info",
};

export default Message;
