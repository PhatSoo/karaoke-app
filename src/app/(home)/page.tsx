"use client";
import Card from "@/components/Room.Card";
import { useEffect, useState } from "react";
import { list } from "../actions/room";

const Home = () => {
  const [rooms, setRooms] = useState<IRooms[]>([]);
  useEffect(() => {
    (async () => {
      const listRooms = await list();

      if (listRooms.success) {
        setRooms(listRooms.data);
      }
    })();
  }, []);

  return (
    <div className="bg-white grid h-full grid-cols-1 justify-items-center gap-y-5 rounded-lg p-5 lg:grid-cols-2 xl:grid-cols-3">
      <Card rooms={rooms} />
    </div>
  );
};

export default Home;
