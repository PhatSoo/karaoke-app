"use client";

import { getOrderDetails } from "@/app/actions/order";
import { payment } from "@/app/actions/payment";
import { Fragment, useEffect, useState } from "react";
import Toast from "./Toast";

interface IProps {
  room: IRooms;
  products: IProducts[];
  onClose: () => void;
}

const Payment = ({ room, products, onClose }: IProps) => {
  const [orderDetail, setOrderDetail] = useState<IOrderDetails | null>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ show: false, message: "" });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(async () => {
      if (orderDetail) {
        const pay = await payment(orderDetail?.id, total());

        if (pay.success) {
          setLoading(false);
          onClose();
        } else {
          setError({ show: true, message: pay.message });
        }
      }
    }, 2000);
  };

  const formatTime = () => {
    const createdAt = orderDetail?.createdAt; // Lấy thời gian tạo đơn hàng

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

  const countPriceTime = () => {
    const countTime =
      formatTime().milliseconds < 3600000
        ? 1
        : formatTime().milliseconds / 3600000;
    return Math.ceil(countTime * room.price);
  };

  const total = () => {
    let itemsPrice = 0;
    if (orderDetail?.item) {
      let total: number = 0;
      orderDetail.item.map((detail) => {
        const product = products.find(
          (product) => product.id === detail.product_id,
        );
        if (product) {
          itemsPrice = total += product.price * detail.quantity;
        }
      });

      return countPriceTime() + itemsPrice;
    } else {
      return 0;
    }
  };

  const formatPrice = (number: number) => {
    return number.toLocaleString("en-US");
  };

  // find order of this room
  useEffect(() => {
    (async () => {
      const orderDetails = await getOrderDetails(room.id);
      if (orderDetails.success) {
        setOrderDetail(orderDetails.data);
      }
    })();
  }, [room.id]);

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
            <p className="mb-10 text-center text-5xl font-bold">
              Tên phòng: {room.room_name}
            </p>
            <div>
              <div className="mb-5 overflow-x-auto px-20">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <p>Giá dịch vụ</p>
                  </div>
                  <div className="col-span-2 grid grid-cols-3 border-b-2">
                    {orderDetail && orderDetail?.item.length > 0 ? (
                      orderDetail?.item.map((item, idx) => {
                        const product = products.find(
                          (product) => product.id === item.product_id,
                        );

                        return (
                          <Fragment key={idx}>
                            <div>{product?.product_name}</div>
                            <div className="text-center">
                              Số lượng: {orderDetail.item[idx].quantity}
                            </div>
                            <div className="text-end">
                              {product &&
                                formatPrice(
                                  product?.price *
                                    orderDetail.item[idx].quantity,
                                )}{" "}
                              VNĐ
                            </div>
                          </Fragment>
                        );
                      })
                    ) : (
                      <div className="col-span-3 text-end">0 VNĐ</div>
                    )}
                  </div>
                  <div>
                    <p>Số giờ sử dụng</p>
                  </div>
                  <div>{formatTime().formattedTime}</div>
                  <div className="text-end">
                    {formatPrice(countPriceTime())} VNĐ
                  </div>

                  <div className="col-span-3 grid grid-cols-3 border-t-2">
                    <div>Tổng cộng</div>
                    <div className="col-span-2 text-end text-red">
                      {formatPrice(total())} VNĐ
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 border-t-2 px-4 py-3 sm:px-6">
            <button className="btn btn-accent" type="submit">
              {loading ? (
                <>
                  <span className="loading loading-dots loading-lg"></span>
                  <p>Chờ xác nhận</p>
                </>
              ) : (
                "Xác nhận"
              )}
            </button>
            <button className="btn btn-error" onClick={onClose}>
              Đóng
            </button>
          </div>
        </form>
      </div>
      {error.show && <Toast message={error.message} type="info" />}
    </div>
  );
};

export default Payment;
