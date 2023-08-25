import React from "react";
import { Link } from "react-router-dom";
import { useDeleteCategoryMutation } from "../../store/components/products/productsApi";
import { useDispatch } from "react-redux";
import { openDialog } from "../../store/components/customDialog/dialogSlice";

const CategoriesTable = ({ categorys, callDelete }: any) => {
  const dispatch = useDispatch();

  const [deleteCategory, { isLoading, error }] = useDeleteCategoryMutation();
  const onDeleteCategory = async (values: any) => {
    const res = await deleteCategory(values);
    //@ts-ignore
    const data = res?.data;

    if (data) {
      callDelete({
        call: Date.now(),
        state: 1,
        value: "Category",
      });
    } else {
      callDelete({
        call: Date.now(),
        state: 2,
        value: "Category",
      });
    }
  };

  const deletehandler = (id: any) => {
    dispatch(
      openDialog({
        type: "confirm",
        title: "Are you sure DELETE??",
        actionConfirm: () => {
          onDeleteCategory({
            categoryId: id,
          });
        },
        actionAfterClose: () => {},
      })
    );
  };

  return (
    <div className="col-md-12 col-lg-8">
      <table className="table">
        <thead>
          <tr>
            <th>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" />
              </div>
            </th>
            <th>ID</th>
            <th>Name</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        {/* Table Data */}
        <tbody>
          {categorys?.map((cate: any, index: number) => {
            return (
              <tr key={cate?._id}>
                <td>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                    />
                  </div>
                </td>
                <td>{index+1}</td>
                <td>
                  <b>{cate?.category}</b>
                </td>
                <td className="text-end">
                  <div className="dropdown">
                    <Link
                      to="#"
                      data-bs-toggle="dropdown"
                      className="btn btn-light"
                    >
                      <i className="fas fa-ellipsis-h"></i>
                    </Link>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="#">
                        Edit info
                      </Link>
                      <div
                        className="dropdown-item text-danger"
                        onClick={() => deletehandler(cate?._id)}
                      >
                        Delete
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
