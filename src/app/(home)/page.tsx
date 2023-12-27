"use client";
import Card from "@/components/Room.Card";
import { createContext, useEffect, useState } from "react";
import { list } from "../actions/room";

export const RoomProvider = createContext(() => {});

const Home = () => {
  const [rooms, setRooms] = useState<IRooms[]>([]);

  const [updateChange, setUpdateChange] = useState(0);
  const updated = () => setUpdateChange((prev) => (prev += 1));

  useEffect(() => {
    (async () => {
      const listRooms = await list();

      if (listRooms.success) {
        setRooms(listRooms.data);
      }
    })();
  }, [updateChange]);

  return (
    <div className="grid h-full grid-cols-1 justify-items-center gap-y-5 rounded-lg bg-white p-5 lg:grid-cols-2 xl:grid-cols-3">
      <RoomProvider.Provider value={updated}>
        <Card rooms={rooms} />
      </RoomProvider.Provider>
    </div>
  );
};

export default Home;
