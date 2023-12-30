/* eslint-disable @next/next/no-img-element */
"use client";
import { listCate } from "@/app/actions/category";
import { remove, update } from "@/app/actions/product";
import React, { useEffect, useState } from "react";
import Toast from "./Toast";

interface IProps {
  data: IProducts | null | undefined;
  onClose: () => void;
  updateState: () => void;
}

const Details = ({ data, onClose, updateState }: IProps) => {
  const [editClick, setEditClick] = useState(false);
  const [category, setCategory] = useState<ICategories[]>([]);
  const [showToast, setShowToast] = useState({ show: false, message: "" });

  let local: IProducts | null = null;

  if (data) {
    local = data;
  }

  const [localData, setLocalData] = useState<IProducts | null>(local);

  useEffect(() => {
    (async () => {
      const listCategory = await listCate();

      if (listCategory.success) {
        const categoryList = listCategory.data;
        setCategory(categoryList);
      }
    })();
  }, []);

  const handleInputChange = (
    fieldName: keyof IProducts,
    value: string | number,
  ) => {
    if (!localData) return; // Kiểm tra xem localData có tồn tại không

    let newValue: string | number | { id: number; category_name: string } =
      value;

    if (fieldName === "category_id") {
      const selectedCategory = category.find(
        (item) => item.id === parseInt(value as string, 10),
      );

      if (selectedCategory) {
        newValue = selectedCategory.id;
      }
    }

    if (
      (fieldName === "quantity" || fieldName === "price") &&
      isNaN(Number(value))
    ) {
      return; // Không cập nhật state nếu không phải là số
    }

    const newData = { ...localData, [fieldName]: newValue };
    setLocalData(newData);
  };

  const handleEditClick = () => {
    setEditClick(true);
  };

  const handleUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    let category;

    if (localData?.category_id.id) {
      category = localData.category_id.id;
    } else {
      category = localData?.category_id;
    }

    const formData = {
      product_name: localData?.product_name,
      price: localData?.price,
      image: localData?.image,
      quantity: localData?.quantity,
      unit: local?.unit,
      category_id: category,
      id: localData?.id,
    };

    const createProduct = await update(formData);
    if (createProduct.success) {
      updateState();
      onClose();
    }
  };

  const handleDelete = async () => {
    if (data && data.id) {
      if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này!")) {
        const res = await remove(data.id);

        if (res.success) {
          onClose();
          updateState();
        } else {
          setShowToast({ show: true, message: res.message });

          setTimeout(() => {
            setShowToast({ show: false, message: "" });
          }, 3000);
        }
      }
    }
  };

  const renderEdit = () => {
    return (
      <div className="grid grid-cols-2 gap-4 p-3">
        <div className="p-2 font-bold">Product Name</div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-accent w-full max-w-xs bg-white text-gray-dark"
          value={localData?.product_name}
          onChange={(e) => handleInputChange("product_name", e.target.value)}
        />

        <div className="p-2 font-bold">Price</div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-accent w-full max-w-xs bg-white text-gray-dark"
          value={localData?.price}
          onChange={(e) => handleInputChange("price", e.target.value)}
        />

        <div className="p-2 font-bold">Unit</div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-accent w-full max-w-xs bg-white text-gray-dark"
          value={localData?.unit}
          onChange={(e) => handleInputChange("unit", e.target.value)}
        />

        <div className="p-2 font-bold">Quantity</div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-accent w-full max-w-xs bg-white text-gray-dark"
          value={localData?.quantity}
          onChange={(e) => handleInputChange("quantity", e.target.value)}
        />

        <div className="p-2 font-bold">Category</div>
        <select
          className="select select-primary w-full max-w-xs bg-white text-gray-dark"
          onChange={(e) => handleInputChange("category_id", e.target.value)}
          defaultValue={localData?.category_id.id}
          required
        >
          {category.map((item) => (
            <option value={item.id} key={item.id}>
              {item.category_name}
            </option>
          ))}
        </select>

        <div className="col-span-2">
          <div className="p-2 font-bold">Image</div>
          <img
            src={localData?.image}
            alt="Product image"
            width={300}
            height={300}
            className="mx-auto"
          />
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-primary mt-2 w-full bg-white text-gray-dark"
            value={localData?.image}
            onChange={(e) => handleInputChange("image", e.target.value)}
            required
          />
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto bg-gray bg-opacity-50">
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block transform overflow-hidden rounded-lg border-4 bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div>
              <div className="overflow-x-auto">
                {editClick ? (
                  renderEdit()
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-2 font-bold">Product Name</div>
                    <div className="p-2">{localData?.product_name}</div>

                    <div className="p-2 font-bold">Price</div>
                    <div className="p-2">{localData?.price}</div>

                    <div className="p-2 font-bold">Unit</div>
                    <div className="p-2">{localData?.unit}</div>

                    <div className="p-2 font-bold">Quantity</div>
                    <div className="p-2">{localData?.quantity}</div>

                    <div className="p-2 font-bold">Category</div>
                    <div className="p-2">
                      {localData?.category_id.category_name}
                    </div>

                    <div className="p-2 font-bold">Status</div>
                    <div
                      className={`badge my-auto p-2 ${
                        localData?.deletedAt
                          ? "badge-secondary"
                          : "badge-primary"
                      }`}
                    >
                      {localData?.deletedAt ? "Removed" : "Showed"}
                    </div>

                    <div className="col-span-2">
                      <div className="p-2 font-bold">Image</div>
                      <img
                        src={localData?.image}
                        alt="Product image"
                        width={300}
                        height={300}
                        className="mx-auto"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 border-t-2 px-4 py-3 sm:px-6">
            {editClick ? (
              <div className="m-auto flex gap-3">
                <button
                  type="button"
                  className="btn btn-info w-24"
                  onClick={handleUpdate}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-success w-24"
                  onClick={() => {
                    setEditClick(false);
                    setLocalData(local);
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="m-auto flex gap-3">
                <button
                  type="button"
                  className="btn btn-accent w-24"
                  onClick={handleEditClick}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className={`btn btn-warning w-24 ${
                    localData?.deletedAt && "btn-disabled"
                  }`}
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            )}

            <button
              type="button"
              className="btn btn-error w-40 self-end"
              onClick={onClose}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
      {showToast.show && <Toast message={showToast.message} type="info" />}
    </div>
  );
};

export default Details;
