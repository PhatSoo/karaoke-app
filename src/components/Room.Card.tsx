import Image from "next/image";
import { useEffect, useState } from "react";
import Details from "./Room.Details";
import { listEmployee } from "@/app/actions/employee";
import { listProd } from "@/app/actions/product";
import Payment from "./Room.Payment";

interface IProps {
  rooms: IRooms[];
}

const Card = ({ rooms }: IProps) => {
  const [orderRoom, setOrderRoom] = useState(false);
  const [payment, setPayment] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [employeeData, setEmployeeData] = useState<IEmployees[]>([]);
  const [productData, setProductData] = useState<IProducts[]>([]);
  const [orderProduct, setOrderProduct] = useState(false);

  useEffect(() => {
    (async () => {
      const employee = await listEmployee();
      const product = await listProd();

      if (employee.success) {
        setEmployeeData(employee.data);
      }

      if (product.success) {
        setProductData(product.data);
      }
    })();
  }, []);

  const handleOrderRoomClick = (idx: number) => {
    setOrderRoom(true);
    setSelectedRoom(idx);
  };

  const handleOrderProductClick = (idx: number) => {
    setSelectedRoom(idx);
    setOrderRoom(true);
    setOrderProduct(true);
  };

  return (
    <>
      {rooms.map((room, idx) => (
        <div key={idx} className="card card-compact w-96 bg-base-100 shadow-xl">
          <figure className="mt-5">
            <Image src={"/room.png"} alt="room" width={200} height={200} />
          </figure>
          <div className="card-body">
            <h2 className="card-title mx-auto">Phòng: {room.room_name}</h2>
            <p
              className={room.status === "NULL" ? "text-success" : "text-error"}
            >
              Trạng thái: {room.status}
            </p>
            <div className="card-actions flex items-center justify-end gap-3">
              {room.status === "NULL" ? (
                <button
                  className="btn btn-warning w-32"
                  onClick={() => handleOrderRoomClick(idx)}
                >
                  Đặt phòng
                </button>
              ) : (
                <>
                  <button
                    className="btn btn-primary w-32"
                    onClick={() => handleOrderProductClick(idx)}
                  >
                    Order
                  </button>
                  <button
                    className="btn btn-accent w-32"
                    onClick={() => setPayment(true)}
                  >
                    Thanh toán
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}

      {orderRoom && (
        <Details
          onClose={() => {
            setOrderRoom(false);
            setOrderProduct(false);
          }}
          room={rooms[selectedRoom]}
          employee={employeeData}
          products={productData}
          isOrder={orderProduct} // Kiểm tra xem là phòng mới hay là order thêm
        />
      )}

      {payment && (
        <Payment
          onClose={() => {
            setPayment(false);
          }}
        />
      )}
    </>
  );
};

export default Card;
