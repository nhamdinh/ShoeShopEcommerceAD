import moment from "moment";
import { Link } from "react-router-dom";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { formatMoney } from "../../utils/commonFunction";

const LatestOrder = ({ orders, isLoading, error }: any) => {
  return (
    <div className="card-body">
      <h4 className="card-title">New orders</h4>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger" mess={error}></Message>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <tbody>
              {orders?.slice(0, 5)?.map((order: any) => {
                return (
                  <tr key={order?._id}>
                    <td>
                      <b>{order?.userId?.name}</b>
                    </td>
                    <td>{order?.userId?.email}</td>
                    <td>${formatMoney(order?.totalAmountPay)}</td>
                    <td>
                      {order?.isPaid ? (
                        <span className="badge rounded-pill alert-success">
                          Paid At {moment(order?.paidAt).format("MMM Do YY")}
                        </span>
                      ) : (
                        <span className="badge rounded-pill alert-danger">
                          Not Paid
                        </span>
                      )}
                    </td>
                    <td>{moment(order?.createdAt).calendar()}</td>

                    <td>
                      {order?.isDelivered ? (
                        <span className="badge btn-success">Delivered</span>
                      ) : (
                        <span className="badge btn-dark">Not delivered</span>
                      )}
                    </td>
                    <td className="d-flex justify-content-end align-item-center">
                      <Link
                        to={`/order/${order?._id}`}
                        className="text-success"
                      >
                        <i className="fas fa-eye"></i>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LatestOrder;
