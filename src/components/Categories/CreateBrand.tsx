import { Upload } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import React, { useState, useEffect } from "react";
import {
  useCreateBrandMutation,
  useUploadImgMutation,
} from "../../store/components/products/productsApi";
import { FOLDER_CATEGORYS_STORAGE } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { openToast } from "../../store/components/customDialog/toastSlice";

const SIZE = 5;
const sizeMax = SIZE * 1000 * 1000;
const CreateBrand = () => {
  const dispatch = useDispatch();

  const [image, setImage] = useState<any>("");
  const [fileList, setFileList] = useState<any>([]);
  const [uploadImg, { isLoading: isLoadingUpload }] = useUploadImgMutation();

  const uploadImage = async (options: any) => {
    const { onSuccess, onError, file, onProgress } = options;

    let sizeImg = file ? Number(file?.size) : sizeMax + 1;
    if (sizeImg <= sizeMax) {
      let formData = new FormData();
      const fileName = Date.now() + file.name;
      formData.append("name", fileName);
      formData.append("file", file);

      try {
        const res: any = await uploadImg({
          formData,
          folder: FOLDER_CATEGORYS_STORAGE,
        });
        let data = res?.data;
        if (data) {
          let fileList_temp: any = [];
          fileList_temp.push({
            url: data?.url,
          });
          setFileList(fileList_temp);
          setImage(data?.url);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
    }
  };

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const [brand, setName] = useState<any>("");

  const [createBrand, { isLoading, error }] = useCreateBrandMutation();

  const onCreateBrand = async (values: any) => {
    const res = await createBrand(values);
    //@ts-ignore
    const data = res?.data;
    console.log(res);
    if (data) {
      dispatch(
        openToast({
          isOpen: Date.now(),
          content: "Create Brand Success",
          step: 1,
        })
      );
      setName("");
      setImage("");
      setFileList([]);
    } else {
      dispatch(
        openToast({
          isOpen: Date.now(),
          content: "Create Brand Failed",
          step: 2,
        })
      );
    }
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    onCreateBrand({
      brand: brand.trim(),
      image,
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
            value={brand}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Images</label>
          <Upload
            fileList={fileList}
            listType="picture-card"
            accept=".png,.jpeg,.gif,.jpg"
            onChange={onChange}
            onPreview={onPreview}
            customRequest={uploadImage}
          >
            {fileList.length < 1 && "Choose file"}
          </Upload>
        </div>

        <div className="d-grid">
          <button className="btn btn-primary py-3">Create brand</button>
        </div>
      </form>
    </div>
  );
};

export default CreateBrand;
