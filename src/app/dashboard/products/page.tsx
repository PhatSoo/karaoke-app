/* eslint-disable @next/next/no-img-element */
"use client";
import { listCate } from "@/app/actions/category";
import { create, listProd } from "@/app/actions/product";
import Details from "@/components/Product.Details";
import React, { ChangeEvent, useEffect, useState } from "react";

const colors = ["primary", "secondary", "accent"];

let categoryColors: { [key: string]: string } = {};

const Product = () => {
  const [filter, setFilter] = useState("");
  const [filterData, setFilterData] = useState<IProducts[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProducts | null>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState<ICategories[]>([]);
  const [updateChange, setUpdateChange] = useState(0);

  // Form add new
  const [addNewClick, setAddNewClick] = useState(false);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categorySelected, setCategorySelected] = useState("");
  const [imageLink, setImageLink] = useState("");

  // Product Data
  const [data, setData] = useState<IProducts[]>([]);

  useEffect(() => {
    (async () => {
      const listCategory = await listCate();
      const listProduct = await listProd();

      if (listCategory.success) {
        const categoryList = listCategory.data;
        setCategory(categoryList);

        for (let i = 0; i < categoryList.length; i++) {
          categoryColors[categoryList[i].id] = colors[i % colors.length];
        }
      }

      if (listProduct.success) {
        setData(listProduct.data);
      }
    })();
  }, [updateChange]);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);

    const filtered = data.filter((item) =>
      item.product_name.toLowerCase().includes(e.target.value),
    );

    setFilterData(filtered);
  };

  const handleCheckboxChange = (idx: number) => {
    let newSelectedItems;
    if (selectedItems.includes(idx)) {
      newSelectedItems = selectedItems.filter((i) => i !== idx);
    } else {
      newSelectedItems = [...selectedItems, idx];
    }
    setSelectedItems(newSelectedItems);

    // Kiểm tra nếu tất cả các mục đã được chọn
    if (newSelectedItems.length === data.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      // Nếu tất cả các mục chưa được chọn, chọn tất cả
      setSelectedItems(data.map((_, idx) => idx));
    } else {
      // Nếu tất cả các mục đã được chọn, bỏ chọn tất cả
      setSelectedItems([]);
    }
  };

  const handleDetailsClick = (idx: number) => {
    setSelectedProduct(data[idx]);
    setIsModalOpen(true);
  };

  const renderListItem = () => {
    return (
      <div className="flex-1 rounded-xl border p-5">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox border-4"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </label>
                </th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>
                  {selectedItems.length > 0 && (
                    <button className="btn btn-warning">Xóa</button>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {(filterData.length > 0 || filter !== "" ? filterData : data).map(
                (item, idx) => (
                  <tr key={idx}>
                    <th>
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox border-4"
                          checked={selectedItems.includes(idx)}
                          onChange={() => handleCheckboxChange(idx)}
                        />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={item.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{item.product_name}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {item.price} VNĐ
                      <br />
                      <span className="font-bold">{item.unit}</span>
                    </td>
                    <td>
                      <div
                        className={`badge p-3 badge-${
                          categoryColors[item.category_id.id]
                        } `}
                      >
                        {item.category_id.category_name}
                      </div>
                    </td>
                    <th>
                      <button
                        className="btn btn-ghost btn-xs"
                        onClick={() => handleDetailsClick(idx)}
                      >
                        details
                      </button>
                    </th>
                  </tr>
                ),
              )}
            </tbody>
            <tfoot>
              <tr>
                <th></th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Category</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  };

  const renderAddNewForm = () => {
    const handlePriceChange = (e: { target: { value: any } }) => {
      // Loại bỏ dấu phẩy từ chuỗi số
      const inputPrice = e.target.value.replace(/,/g, "");

      // Kiểm tra nếu giá trị sau khi loại bỏ dấu phẩy là số hợp lệ
      const isValidPrice =
        !isNaN(parseFloat(inputPrice)) && isFinite(inputPrice);

      if (isValidPrice || inputPrice === "") {
        setPrice(inputPrice);
      }
    };

    const handleQuantityChange = (e: { target: { value: any } }) => {
      const inputQuantity = e.target.value;

      // Kiểm tra xem giá trị nhập vào có phải là số và lớn hơn 0 không
      const isValidQuantity =
        /^\d+$/.test(inputQuantity) && parseInt(inputQuantity) > 0;

      if (isValidQuantity || inputQuantity === "") {
        // Nếu giá trị nhập vào là hợp lệ hoặc là chuỗi rỗng, cập nhật state
        setQuantity(inputQuantity);
      }
    };

    const formatPrice = (price: string) => {
      // Hàm định dạng giá trị số thành chuỗi có dấu chấm ngăn cách hàng nghìn
      return price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
      e.preventDefault();

      const formData = {
        product_name: productName,
        price: parseInt(price),
        image: imageLink,
        quantity: parseInt(quantity),
        unit,
        category_id: categorySelected,
      };

      const createProduct = await create(formData);
      if (createProduct.success) {
        setAddNewClick(false);
      }
    };

    const handleImageError = () => {
      // Xử lý khi hình ảnh không thể tải được
      // Thay thế nó bằng hình ảnh mặc định hoặc thông báo lỗi
      setImageLink("/product-default.jpg");
    };

    return (
      <>
        <h1 className="text-center text-5xl font-bold">Add new Product</h1>
        <form
          onSubmit={handleSubmit}
          className="my-auto grid grid-cols-3 rounded-lg border-2 p-2"
        >
          <div className="border-r-2 p-2">
            <div className="mb-2 font-bold">Product Name</div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-primary w-full max-w-xs bg-white text-gray-dark"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>

          <div className="border-r-2 p-2">
            <div className="mb-2 font-bold">Price</div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-primary w-full max-w-xs bg-white text-gray-dark"
              value={formatPrice(price)}
              onChange={handlePriceChange}
              required
            />
          </div>

          <div className="p-2">
            <div className="mb-2 font-bold">Unit</div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-primary w-full max-w-xs bg-white text-gray-dark"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              required
            />
          </div>

          <div className="border-r-2 p-2">
            <div className="mb-2 font-bold">Quantity</div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-primary w-full max-w-xs bg-white text-gray-dark"
              value={quantity}
              onChange={handleQuantityChange}
              required
            />
          </div>

          <div className="border-r-2 p-2">
            <div className="mb-2 font-bold">Category</div>
            <select
              className="select select-primary w-full max-w-xs bg-white text-gray-dark"
              onChange={(e) => setCategorySelected(e.target.value)}
              defaultValue={""}
              required
            >
              <option value={""} disabled>
                Select Category
              </option>
              {category.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.category_name}
                </option>
              ))}
            </select>
          </div>

          <div className="p-2">
            <div className="mb-3">
              <div className="mb-2 font-bold">Image</div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-primary max-w-[20rem] bg-white text-gray-dark md:w-[11rem] lg:w-[20rem]"
                value={imageLink}
                onChange={(e) => setImageLink(e.target.value)}
                required
              />
            </div>
            <img
              className="m-auto"
              src={imageLink === "" ? "/product-default.jpg" : imageLink}
              alt="Test Image"
              width={150}
              onError={handleImageError}
              height={150}
            />
          </div>

          <div className="col-span-3 flex justify-end gap-4 p-2">
            <button className="btn btn-accent" type="submit">
              Create
            </button>
            <button
              className="btn btn-neutral"
              onClick={() => setAddNewClick(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </>
    );
  };

  return (
    <>
      <div className="flex h-full flex-col gap-5">
        <div className="flex justify-between px-10">
          <button className="btn btn-info" onClick={() => setAddNewClick(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Add new
          </button>

          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-info w-full max-w-xs bg-white text-black"
            value={filter}
            onChange={handleFilterChange}
          />
        </div>
        {addNewClick ? renderAddNewForm() : renderListItem()}
      </div>

      {isModalOpen && (
        <Details
          data={selectedProduct}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
          updateState={() => setUpdateChange((prev) => prev + 1)}
        />
      )}
    </>
  );
};

export default Product;
