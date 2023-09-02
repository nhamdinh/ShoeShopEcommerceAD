import "./App.scss";
import "./responsive.scss";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

import { Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "./routers";
import CustomDialog from "./components/customDialog";
import Toast from "./components/LoadingError/Toast";
import { REACT_ENV, SOCKET_HOST } from "./utils/constants";
import { useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import { openToast } from "./store/components/customDialog/toastSlice";
import { getUserInfo } from "./store/selector/RootSelector";
import { setStoChatNotices } from "./store/components/products/productsSlice";
import { useGetAllMemberQuery } from "./store/components/auth/authApi";

const App = () => {
  console.log("env ::: ", REACT_ENV);
  const dispatch = useDispatch();
  const userInfo = useSelector(getUserInfo);
  const {
    data,
    error,
    isSuccess,
    isLoading,
    refetch: refetchAllMember,
  } = useGetAllMemberQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      // setdataFetched(data?.users);
      dispatch(setStoChatNotices(data?.users));
    }
  }, [data]);

  const socketRef = useRef<any>();
  useEffect(() => {
    //@ts-ignore
    socketRef.current = socketIOClient.connect(SOCKET_HOST);

    socketRef.current.on("serverSetSocketId", (socketId: any) => {
      //   setIdSocketId(socketId);
    });

    socketRef.current.on("serverSendData", (data: any) => {
      // console.log("serverSendData ::: ", data);
      if (data?.sendFrom !== userInfo?.email) {
        refetchAllMember();
        dispatch(
          openToast({
            isOpen: Date.now(),
            content: data?.sendFrom + " send a message",
            step: 1,
          })
        );
      }
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [userInfo]);

  return (
    <div className="app-wrapper">
      <Routes>
        {PrivateRoutes.map((item: any, index) => (
          <Route key={index} path={item.path} element={item.element} />
        ))}
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>

      <CustomDialog />
      <Toast />

      {/* <Footer /> */}
    </div>
  );
};

export default App;
