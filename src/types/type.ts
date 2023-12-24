interface IRooms {
  room_name: string;
  status: string;
}

interface IProducts {
  product_name: string;
  price: number;
  category_id: {
    id: number;
    name: string;
  };
  image: string;
  quantity: number;
  unit: string;
}

interface ICategories {
  id: number;
  category_name: string;
}
