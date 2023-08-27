import React, { useEffect, useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import UserRegister from "./UserRegister";
import { useGetAllMemberQuery } from "../../store/components/auth/authApi";
import { formatCustomerPhoneNumber } from "../../utils/commonFunction";

const UserComponent = () => {
  const [tab, settab] = useState<any>(1);

  const [userList, setdataFetched] = useState<any>([]);
  const { data, error, isSuccess, isLoading } = useGetAllMemberQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      setdataFetched(data?.users);
    }
  }, [data]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2
          onClick={() => {
            settab(1);
          }}
          className="content-title"
        >
          Customers
        </h2>
        <div>
          <div
            onClick={() => {
              settab(2);
            }}
            className="btn btn-primary"
          >
            <i className="material-icons md-plus"></i> Create new
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <header className="card-header">
          <div className="row gx-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Search..."
                className="form-control"
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Show 20</option>
                <option>Show 30</option>
                <option>Show 40</option>
                <option>Show all</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Status: all</option>
                <option>Active only</option>
                <option>Disabled</option>
              </select>
            </div>
          </div>
        </header>

        {/* Card */}
        <div className="card-body">
          {isLoading ? (
            <Loading />
          ) : error ? (
            <Message
              variant="alert-danger"
              mess={JSON.stringify(error)}
            ></Message>
          ) : tab === 1 ? (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
              {userList?.map((user: any) => (
                <div className="col" key={user?._id}>
                  <div className="card card-user shadow-sm">
                    <div className="card-header">
                      <img
                        className="img-md img-avatar"
                        src="https://w.ladicdn.com/5bf3dc7edc60303c34e4991f/logo-15-20200415164142.png"
                        alt="User pic"
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title mt-5">{user?.name}</h5>
                      <div className="card-text text-muted">
                        {user?.isAdmin === true ? (
                          <p className="m-0">Admin</p>
                        ) : (
                          <p className="m-0">Customer</p>
                        )}
                        <p className="m-0">
                          {formatCustomerPhoneNumber(user?.phone)}
                        </p>

                        <p>
                          <a href={`mailto:${user?.email}`}>{user?.email}</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <UserRegister />
          )}

          {/* nav */}
          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="#">
                  Previous
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default UserComponent;
