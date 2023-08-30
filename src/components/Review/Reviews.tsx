import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Input } from "antd";
import { useUpdateReviewMutation } from "../../store/components/products/productsApi";
import { useDispatch } from "react-redux";
import { openToast } from "../../store/components/customDialog/toastSlice";
import Loading from "../LoadingError/Loading";
const { TextArea } = Input;

const Reviews = ({ reviews }: any) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Comment</th>
          <th scope="col">Date</th>
          <th scope="col" className="text-end">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {reviews?.map((rev: any) => (
          <CompTableReviews key={rev?._id} rev={rev} />
        ))}
      </tbody>
    </table>
  );
};
function CompTableReviews({ rev }: any) {
  const [value, setValue] = useState<any>(rev?.comment);

  const dispatch = useDispatch();

  const [updateReview, { isLoading, error: errorupdateProduct }] =
    useUpdateReviewMutation();

  const onUpdateReview = async (values: any) => {
    const res = await updateReview(values);
    //@ts-ignore
    const data = res?.data;

    if (data) {
      dispatch(
        openToast({
          isOpen: Date.now(),
          content: "Updated Review Success",
          step: 1,
        })
      );
    } else {
      dispatch(
        openToast({
          isOpen: Date.now(),
          content: "Update Review Failed",
          step: 2,
        })
      );
    }
  };

  return (
    <tr key={rev?._id}>
      <td>
        <b>{rev?.name}</b>
      </td>
      <td>
        <TextArea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </td>

      <td>{moment(rev?.updatedAt).format("MMM Do YY")}</td>

      <td className="d-flex justify-content-end align-item-center gap8px">
        <div
          onClick={(e) => {
            e.preventDefault();
            onUpdateReview({
              reviewId: rev?._id,
              comment: value,
              productId: rev?.productId,
            });
          }}
          className="btn btn-primary"
        >
          <i className="material-icons md-plus"></i>
          {isLoading ? <Loading /> : "Edit"}
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();
            // onUpdateReview({
            //   reviewId: rev?._id,
            //   comment: value,
            //   productId: rev?.productId,
            // });
          }}
          className="btn btn-primary"
        >
          <i className="material-icons md-plus"></i>
          Delete{" "}
        </div>
      </td>
    </tr>
  );
}
export default Reviews;
