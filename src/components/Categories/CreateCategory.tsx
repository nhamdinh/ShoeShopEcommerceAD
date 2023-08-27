import { useState } from "react";
import { useCreateCategoryMutation } from "../../store/components/products/productsApi";

const CreateCategory = ({ callDelete }: any) => {
  const [category, setName] = useState<any>("");

  const [createCategory, { isLoading, error }] = useCreateCategoryMutation();

  const onCreateCategory = async (values: any) => {
    const res = await createCategory(values);
    //@ts-ignore
    const data = res?.data;
    console.log(res);
    if (data) {
      callDelete({
        call: Date.now(),
        state: 1,
        value: "Category",
      });
      setName("");
    } else {
      callDelete({
        call: Date.now(),
        state: 2,
        value: "Category",
      });
    }
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    onCreateCategory({
      category: category.trim(),
    });
  };

  return (
    <div className="col-md-12 col-lg-4">
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label htmlFor="product_name" className="form-label">
            Name
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="form-control py-3"
            id="product_name"
            value={category}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

        <div className="d-grid">
          <button className="btn btn-primary py-3">Create category</button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
