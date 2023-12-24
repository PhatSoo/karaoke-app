/* eslint-disable @next/next/no-img-element */
"use client";
import Details from "@/components/Product.Details";
import React, { ChangeEvent, useState } from "react";

const data: IProducts[] = [
  {
    product_name: "Bánh mì sandwich",
    price: 50000,
    category_id: {
      id: 1,
      name: "Đồ ăn",
    },
    image: "image_link",
    quantity: 100,
    unit: "cái",
  },
  {
    product_name: "Nước ngọt Coca",
    price: 20000,
    category_id: {
      id: 2,
      name: "Thức uống",
    },
    image: "image_link",
    quantity: 200,
    unit: "lon",
  },
  {
    product_name: "Bia Heineken",
    price: 30000,
    category_id: {
      id: 2,
      name: "Thức uống",
    },
    image: "image_link",
    quantity: 150,
    unit: "lon",
  },
  {
    product_name: "Khoai tây chiên",
    price: 60000,
    category_id: {
      id: 1,
      name: "Đồ ăn",
    },
    image: "image_link",
    quantity: 80,
    unit: "phần",
  },
];

const category: ICategories[] = [
  {
    id: 1,
    category_name: "Đồ ăn",
  },
  {
    id: 2,
    category_name: "Thức uống",
  },
];

const colors = ["primary", "secondary", "accent"];

let categoryColors: { [key: string]: string } = {};

for (let i = 0; i < category.length; i++) {
  categoryColors[category[i].id] = colors[i % colors.length];
}

const Product = () => {
  const [filter, setFilter] = useState("");
  const [filterData, setFilterData] = useState<IProducts[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProducts | null>();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <>
      <div
        className={`flex h-full flex-col gap-5 ${
          isModalOpen ? "bg-gray bg-opacity-50" : ""
        }`}
      >
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-info w-full max-w-xs self-end bg-white text-black"
          value={filter}
          onChange={handleFilterChange}
        />
        <div className="flex-1 rounded-xl border p-5">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </label>
                  </th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {(filterData.length > 0 || filter !== ""
                  ? filterData
                  : data
                ).map((item, idx) => (
                  <tr key={idx}>
                    <th>
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox"
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
                              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
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
                        {item.category_id.name}
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
                ))}
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
      </div>

      {isModalOpen && (
        <Details
          data={selectedProduct}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </>
  );
};

export default Product;
