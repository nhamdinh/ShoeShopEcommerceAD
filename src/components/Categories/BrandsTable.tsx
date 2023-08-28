import "./style.scss";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openDialog } from "../../store/components/customDialog/dialogSlice";
import { useDeleteBrandMutation } from "../../store/components/products/productsApi";

const BrandsTable = ({ brands, callDelete }: any) => {
  const dispatch = useDispatch();

  const [deleteBrand, { isLoading, error }] = useDeleteBrandMutation();
  const onDeleteBrand = async (values: any) => {
    const res = await deleteBrand(values);
    //@ts-ignore
    const data = res?.data;

    if (data) {
      callDelete({
        call: Date.now(),
        state: 1,
        value: "Brand",
      });
    } else {
      callDelete({
        call: Date.now(),
        state: 2,
        value: "Brand",
      });
    }
  };

  const deletehandler = (id: any) => {
    dispatch(
      openDialog({
        type: "confirm",
        title: "Are you sure DELETE??",
        actionConfirm: () => {
          onDeleteBrand({
            brandId: id,
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
            <th>Image</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        {/* Table Data */}
        <tbody>
          {brands?.map((bra: any, index: number) => {
            return (
              <tr key={bra?._id}>
                <td>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                    />
                  </div>
                </td>
                <td>{index + 1}</td>
                <td>
                  <b>{bra?.brand}</b>
                </td>
                <td><img className="image__bra" src={bra?.image} alt="image__bra" /></td>
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
                        onClick={() => deletehandler(bra?._id)}
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

export default BrandsTable;
