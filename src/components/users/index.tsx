import { useEffect, useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import UserRegister from "./UserRegister";
import { formatCustomerPhoneNumber } from "../../utils/commonFunction";
import ChatBox from "../ChatBox";
import { useSelector } from "react-redux";
import { getChatNotices, getUserInfo } from "../../store/selector/RootSelector";
import { useDispatch } from "react-redux";
import {
  useClearCountChatMutation,
  useGetAllMemberQuery,
} from "../../store/components/auth/authApi";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const UserComponent = () => {
  const [tab, settab] = useState<any>(1);
  const userInfo = useSelector(getUserInfo);
  const chatNotices = useSelector(getChatNotices);
  const [userList, setdataFetched] = useState<any>([]);

  const [searchBy, setsearchBy] = useState<any>("email");
  const [keyword, setkeyword] = useState<any>("");

  const [params, setParams] = useState<any>({
    searchBy,
    keyword,
  });
  const {
    data,
    error,
    isSuccess,
    isLoading,
    refetch: refetchAllMember,
  } = useGetAllMemberQuery(params, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  useEffect(() => {
    if (isSuccess) {
      setdataFetched(data?.metadata?.users);
    }
  }, [data]);

  useEffect(() => {
    refetchAllMember();
  }, [chatNotices]);

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
              <div className="df">
                <input
                  type="text"
                  placeholder="Search..."
                  className="form-control"
                  value={keyword}
                  onChange={(e) => setkeyword(e.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      setParams({ searchBy, keyword: keyword.trim() });
                    }
                  }}
                />

                <select
                  className="select__user"
                  value={searchBy}
                  onChange={(e) => setsearchBy(e.target.value)}
                >
                  <option value={"email"}>{"email"}</option>
                  <option value={"phone"}>{"phone"}</option>
                </select>
                <button
                  type="submit"
                  onClick={() => {
                    setParams({ searchBy, keyword: keyword.trim() });
                  }}
                  className="search-button"
                >
                  search
                </button>
              </div>
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
            <Message variant="alert-danger" mess={error}></Message>
          ) : tab === 1 ? (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
              {userList?.map((user: any) => {
                if (userInfo?.email !== user?.email)
                  return <RowUser key={user?._id} user={user}></RowUser>;
              })}
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

const RowUser = ({ user }: any) => {
  const [showMessageBox, setShowMessageBox] = useState<any>(false);

  const [clearCountChat, { isLoading, error }] = useClearCountChatMutation();

  const onClearCountChat = async (values: any) => {
    const res = await clearCountChat(values);

    //@ts-ignore
    const data = res?.data;

    if (data) {
      console.log(data);
    } else {
    }
  };

  return (
    <div className="col">
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
            <p className="m-0">{formatCustomerPhoneNumber(user?.phone)}</p>
            <p>
              <a href={`mailto:${user?.email}`}>{user?.email}</a>
            </p>
            <div
              onClick={() => {
                setShowMessageBox(!showMessageBox);

                //render-re
                onClearCountChat({ email: user?.email });
              }}
              className="Chat"
            >
              Chat{" "}
              <div
                className={user?.countChat > 0 ? "co__chat ani" : "co__chat"}
              >
                {user?.countChat}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showMessageBox && (
        <ChatBox
          closeMessageBox={() => {
            setShowMessageBox(false);
          }}
          showMessageBox={showMessageBox}
          toUser={user}
        />
      )}
    </div>
  );
};

export default UserComponent;
