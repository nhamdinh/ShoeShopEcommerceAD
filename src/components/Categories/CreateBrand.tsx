import React from "react";

const CreateBrand = () => {
  return (
    <div className="col-md-12 col-lg-4">
      <form>
        <div className="mb-4">
          <label htmlFor="product_name" className="form-label">
            Name
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="form-control py-3"
            id="product_name"
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Images</label>
          <input className="form-control" type="file" />
        </div>


        <div className="d-grid">
          <button className="btn btn-primary py-3">Create brand</button>
        </div>
      </form>
    </div>
  );
};

export default CreateBrand;