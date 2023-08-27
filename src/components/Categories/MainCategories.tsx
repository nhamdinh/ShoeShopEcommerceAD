import React, { useEffect, useState } from "react";
import CreateCategory from "./CreateCategory";
import CategoriesTable from "./CategoriesTable";
import BrandsTable from "./BrandsTable";
import CreateBrand from "./CreateBrand";
import {
  useGetBrandsQuery,
  useGetCategorysQuery,
} from "../../store/components/products/productsApi";
import Toast from "../LoadingError/Toast";
import { toast } from "react-toastify";
import { ToastObjects } from "../../utils/constants";

const MainCategories = () => {
  const [brands, setbrands] = useState<any>([]);

  const {
    data: brandsdata,
    error: brandsserror,
    isSuccess: brandsisSuccess,
    isLoading: isLoadingbrands,
  } = useGetBrandsQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );
  useEffect(() => {
    if (brandsisSuccess) {
      setbrands(brandsdata?.brands);
    }
  }, [brandsdata]);

  const [categorys, setcategorys] = useState<any>([]);

  const {
    data,
    error: categoryserror,
    isSuccess: isSuccesscategorys,
    isLoading: isLoadingcategorys,
  } = useGetCategorysQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );
  useEffect(() => {
    if (isSuccesscategorys) {
      setcategorys(data?.categorys);
    }
  }, [data]);
  const [callDel, setcallDel] = useState<any>({
    call: Date.now(),
    state: 3,
    value: "",
  });

  useEffect(() => {
    if (callDel.state === 1) {
      toast.success(`${callDel.value} Deleted`, ToastObjects);
    }
    if (callDel.state === 2) {
      toast.error(`Delete ${callDel.value} Failed`, ToastObjects);
    }
  }, [callDel]);

  return (
    <>
      <Toast></Toast>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title">Categories</h2>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <div className="row">
              {/* Create category */}
              <CreateCategory
                callDelete={(sta: any) => {
                  setcallDel(sta);
                }}
              />
              {/* Categories table */}
              <CategoriesTable
                callDelete={(sta: any) => {
                  setcallDel(sta);
                }}
                categorys={categorys}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title">Brands</h2>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <div className="row">
              {/* Create category */}
              <CreateBrand
                callDelete={(sta: any) => {
                  setcallDel(sta);
                }}
              />
              {/* Categories table */}
              <BrandsTable
                callDelete={(sta: any) => {
                  setcallDel(sta);
                }}
                brands={brands}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainCategories;
