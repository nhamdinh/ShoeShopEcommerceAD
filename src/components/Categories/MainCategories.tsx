import React, { useEffect, useState } from "react";
import CreateCategory from "./CreateCategory";
import CategoriesTable from "./CategoriesTable";
import BrandsTable from "./BrandsTable";
import CreateBrand from "./CreateBrand";
import {
  useGetBrandsQuery,
  useGetCategorysQuery,
} from "../../store/components/products/productsApi";

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

  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title">Categories</h2>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <div className="row">
              {/* Create category */}
              <CreateCategory />
              {/* Categories table */}
              <CategoriesTable categorys={categorys} />
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
              <CreateBrand />
              {/* Categories table */}
              <BrandsTable brands={brands} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainCategories;
