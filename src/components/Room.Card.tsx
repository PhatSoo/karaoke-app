"use client";
import Image from "next/image";

interface IProps {
  rooms: IRooms[];
}

const Card = ({ rooms }: IProps) => {
  const handleOrderClick = () => {};

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
                <button className="btn btn-warning w-32">Đặt phòng</button>
              ) : (
                <>
                  <button
                    className="btn btn-primary w-32"
                    onClick={handleOrderClick}
                  >
                    Order
                  </button>
                  <button className="btn btn-accent w-32">Thanh toán</button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
