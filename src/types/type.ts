interface IRooms {
  id: number;
  room_name: string;
  price: number;
  status: string;
}

interface IProducts {
  id: number;
  product_name: string;
  price: number;
  category_id: {
    id: number;
    category_name: string;
  };
  image: string;
  quantity: number;
  unit: string;
  deletedAt?: Date;
}

interface ICategories {
  id: number;
  category_name: string;
}

interface IEmployees {
  id?: number;
  username: string;
}

interface IOrderDetails {
  id: number;
  room_id: number;
  user_id: number;
  time_using: number;
  status: string;
  createdAt: Date;
  item: {
    id: number;
    product_id: number;
    quantity: number;
  }[];
}
