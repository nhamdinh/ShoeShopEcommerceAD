import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openDialog } from "../../store/components/customDialog/dialogSlice";
import { useDeleteProductMutation } from "../../store/components/products/productsApi";
import Loading from "../LoadingError/Loading";
import { openToast } from "../../store/components/customDialog/toastSlice";

const Product = ({ product }: any) => {
  const dispatch = useDispatch();
  const [deleteProduct, { isLoading, error }] = useDeleteProductMutation();
  const onDeleteProduct = async (values: any) => {
    const res = await deleteProduct(values);
    //@ts-ignore
    const data = res?.data;

    if (data) {
      dispatch(
        openToast({
          isOpen: Date.now(),
          content: "Deleted Product Success",
          step: 1,
        })
      );
    } else {
      dispatch(
        openToast({
          isOpen: Date.now(),
          content: "Delete Product Failed",
          step: 2,
        })
      );
    }
  };

  const deletehandler = (id: any) => {
    dispatch(
      openDialog({
        type: "confirm",
        title: "Are you sure DELETE??",
        actionConfirm: () => {
          onDeleteProduct({
            productId: id,
          });
        },
        actionAfterClose: () => {},
      })
    );
  };

  return (
    <>
      <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card card-product-grid shadow-sm">
          <Link to="#" className="img-wrap">
            <img src={product?.product_thumb} alt="Product" />
          </Link>
          <div className="info-wrap">
            <div className="title text-truncate colorred">
              Type: {product?.product_attributes?.brand + " / " + product?.product_attributes?.material}
            </div>
            <div className="title text-truncate">{product?.product_name}</div>
            <div className="price mb-2">${product?.product_price}</div>
            <div className="row">
              <Link
                to={`/product/${product?._id}/edit`}
                className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
              >
                <i className="fas fa-pen"></i>
              </Link>
              <Link
                to="#"
                onClick={() => deletehandler(product?._id)}
                className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
              >
                {isLoading ? <Loading /> : <i className="fas fa-trash-alt"></i>}{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
