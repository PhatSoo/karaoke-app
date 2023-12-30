/* eslint-disable @next/next/no-img-element */
"use client";
import { getOrderDetails, orderProduct, orderRoom } from "@/app/actions/order";
import Image from "next/image";
import { useEffect, useState } from "react";
import Toast from "./Toast";

interface IProps {
  room: IRooms;
  onClose: () => void;
  employee: IEmployees[];
  products: IProducts[];
  isOrder: boolean;
}

const Details = ({ room, employee, products, isOrder, onClose }: IProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [orderDetails, setOrderDetails] = useState<IOrderDetails | null>();
  const [productQuantities, setProductQuantities] = useState(
    products.reduce((acc, product) => ({ ...acc, [product.id]: 0 }), {}),
  );
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState({ show: false, message: "", position: 0 });

  useEffect(() => {
    if (isOrder) {
      (async () => {
        const res = await getOrderDetails(room.id);

        if (res.success) {
          setOrderDetails(res.data);
        }
      })();
    }

    return () => {
      setOrderDetails(null);
    };
  }, [isOrder, room]);

  const handleChange = (id: number) => (event: { target: { value: any } }) => {
    const value =
      event.target.value === "" || isNaN(event.target.value)
        ? 0
        : event.target.value;

    if (products.find((item) => item.id === id).quantity < value) {
      setError({
        show: true,
        message: "Không đủ số lượng yêu cầu",
        position: id,
      });
    } else {
      setError({
        show: false,
        message: "",
        position: 0,
      });

      setProductQuantities({
        ...productQuantities,
        [id]: value,
      });
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const allZero = Object.values(productQuantities).every(
      (quantity) => quantity === 0 || quantity === "",
    );

    const listOrder: { product_id: string; quantity: unknown }[] = [];

    const nonZeroEntries = Object.entries(productQuantities).filter(
      ([key, value]) => value !== 0,
    );

    nonZeroEntries.map(([key, value]) =>
      listOrder.push({
        product_id: key,
        quantity: value,
      }),
    );

    if (isOrder) {
      if (allZero) {
        setShowToast(true);

        setTimeout(() => {
          setShowToast(false);
        }, 3000);
        return;
      }
      if (orderDetails) {
        const res = await orderProduct(orderDetails.id, listOrder);
        if (res.success) {
          onClose();
        }
      }
    } else {
      const res = await orderRoom(
        room.id,
        parseInt(selectedEmployee),
        listOrder,
      );
      if (res.success) {
        onClose();
      }
    }
  };

  const formatTime = () => {
    const createdAt = orderDetails?.createdAt; // Lấy thời gian tạo đơn hàng

    if (createdAt) {
      const createdDate = new Date(createdAt).getTime(); // Chuyển đổi chuỗi thời gian thành đối tượng Date
      const currentDate = new Date().getTime(); // Lấy thời gian hiện tại

      const timeDiff = currentDate - createdDate; // Tính chênh lệch thời gian

      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

      const formattedTime = `${hours} giờ ${minutes} phút`;
      return { formattedTime, milliseconds: timeDiff };
    }
    return { formattedTime: "", milliseconds: 0 };
  };

  const countTotalPrice = () => {
    const countTime =
      formatTime().milliseconds < 3600000
        ? 1
        : formatTime().milliseconds / 3600000;

    return Math.ceil(countTime * room.price + itemPrice());
  };

  const itemPrice = () => {
    if (orderDetails?.item) {
      let total: number = 0;
      orderDetails.item.map((detail) => {
        const product = products.find(
          (product) => product.id === detail.product_id,
        );
        if (product) {
          return (total += product.price * detail.quantity);
        }
      });
      return total;
    } else {
      return 0;
    }
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

        <form
          onSubmit={handleSubmit}
          className="my-8 inline-block w-full max-w-7xl transform overflow-hidden rounded-lg border-4 bg-white text-left align-middle shadow-xl transition-all"
        >
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div>
              <div className="overflow-x-auto">
                <div className="mb-4 grid grid-cols-3 gap-4 border-b-2 p-2">
                  <div className="self-center">
                    {!isOrder ? (
                      <select
                        className="select select-primary w-full max-w-xs bg-white"
                        defaultValue={""}
                        onChange={(e) => setSelectedEmployee(e.target.value)}
                        required
                      >
                        <option disabled value={""}>
                          Nhân viên
                        </option>
                        {employee.map((item) => (
                          <option value={item.id} key={item.id}>
                            {item.username}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div>
                        <p>
                          Nhân viên phụ trách:{" "}
                          <span className="text-xl text-secondary">
                            {
                              employee.find(
                                (item) => item.id === orderDetails?.user_id,
                              )?.username
                            }
                          </span>
                        </p>
                      </div>
                    )}
                    <div role="alert" className="alert alert-info mt-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="h-6 w-6 shrink-0 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <span>
                        Giá phòng:{" "}
                        <span className="text-2xl text-error">
                          {room.price}
                        </span>
                        /h
                      </span>
                    </div>
                  </div>
                  <div className="m-auto text-center">
                    <Image
                      src={"/room.png"}
                      alt="room"
                      width={200}
                      height={200}
                    />
                    <p className="mt-2 font-bold">{room.room_name}</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                      <p className="text-lg text-black">Order:</p>
                      <div className="grid h-fit w-full grid-cols-2 gap-2">
                        {Object.entries(productQuantities)
                          .filter(([key, value]) => value > 0)
                          .map(([key, value]) => {
                            const product = products.find(
                              (product) => product.id === parseInt(key),
                            );
                            return (
                              <div
                                key={key}
                                className="col-span-2 flex justify-between border-b-2"
                              >
                                <div className="">
                                  {product && product.product_name}:
                                </div>
                                <div className="">{value}</div>
                              </div>
                            );
                          })}
                      </div>
                    </div>

                    {isOrder && (
                      <div className="mt-4">
                        <p className="text-lg text-black">Chi phí (tạm tính)</p>
                        <div className="ml-4 p-2">
                          <div className="flex justify-between">
                            <p>Tổng giá sản phẩm:</p>
                            <p className="text-error">{itemPrice()} đ</p>
                          </div>
                          <div className="flex justify-between">
                            <p>Số giờ sử dụng:</p>
                            <p className="text-error">
                              {formatTime().formattedTime}
                            </p>
                          </div>
                          <div className="flex justify-between border-t-2">
                            <p>Tổng cộng:</p>
                            <p className="text-error">{countTotalPrice()} đ</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-center text-2xl font-bold text-black">
                  Chọn dịch vụ
                </p>
                <div className="grid grid-cols-4 gap-4 p-2">
                  {products.map((item) => (
                    <div
                      key={item.id}
                      className={`flex flex-col items-center justify-between gap-y-2 rounded-xl border p-2 ${
                        item.quantity === 0 && "pointer-events-none opacity-30"
                      }`}
                    >
                      <div className="m-auto">
                        <img
                          src={item.image}
                          alt="product image"
                          height={200}
                          width={200}
                        />
                      </div>
                      <div>
                        Giá:{" "}
                        <span className="text-xl text-success">
                          {item.price}
                        </span>{" "}
                        VNĐ
                      </div>
                      <input
                        type="text"
                        placeholder="Nhập số lượng..."
                        className="input input-bordered input-secondary w-full max-w-xs bg-white"
                        value={productQuantities[item.id]}
                        onChange={handleChange(item.id)}
                      />
                      {error.show && error.position === item.id && (
                        <div role="alert" className="alert alert-error">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 stroke-current"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>{error.message}</span>
                        </div>
                      )}
                      <div>
                        Tồn kho:{" "}
                        <span className="text-secondary">
                          {item.quantity} {item.unit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 border-t-2 px-4 py-3 sm:px-6">
            <button className="btn btn-accent" type="submit">
              Xác nhận
            </button>
            <button className="btn btn-error" onClick={onClose}>
              Đóng
            </button>
          </div>
        </form>
      </div>

      {showToast && <Toast message="Bạn chưa chọn sản phẩm" type="info" />}
    </div>
  );
};

export default Details;
