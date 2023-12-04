import React, { useEffect, useState } from "react";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import {
  useGetProductsQuery,
  useGetReviewsByShopQuery,
} from "../../store/components/products/productsApi";
import Reviews from "./Reviews";

export default function ReviewMain() {
  const {
    data,
    error: err,
    isSuccess: is,
    isLoading: lo,
  } = useGetReviewsByShopQuery(
    {
      page: 1,
      limit: 1000,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );
  useEffect(() => {
    if (is) {
      console.log(data)
    }
  }, [data]);

  const [reviews, setreviews] = useState<any>([]);
  const {
    data: dataFetch,
    error,
    isSuccess,
    isLoading,
  } = useGetProductsQuery(
    {
      page: 1,
      limit: 1000,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );
  useEffect(() => {
    if (isSuccess) {
      // console.log(dataFetch);
      let reviews: any = [];
      dataFetch?.products?.map((product: any) => {
        product?.reviews?.map((rew: any) => {
          reviews.push({ ...rew, productId: product?._id });
        });
      });
      // setreviews(reviews);
    }
  }, [dataFetch]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Reviews</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Search..."
                className="form-control p-2"
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Status</option>
                <option>Active</option>
                <option>Disabled</option>
                <option>Show all</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Show 20</option>
                <option>Show 30</option>
                <option>Show 40</option>
              </select>
            </div>
          </div>
        </header>
        <div className="card-body">
          <div className="table-responsive">
            {isLoading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger" mess={error}></Message>
            ) : (
              <Reviews reviews={reviews} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
