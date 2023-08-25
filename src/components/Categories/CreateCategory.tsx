import { Upload } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import React, { useState, useEffect } from "react";
import { useUploadImgMutation } from "../../store/components/products/productsApi";
import { FOLDER_CATEGORYS_STORAGE } from "../../utils/constants";

const SIZE = 5;
const sizeMax = SIZE * 1000 * 1000;
const CreateCategory = () => {
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
          <button className="btn btn-primary py-3">Create category</button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
