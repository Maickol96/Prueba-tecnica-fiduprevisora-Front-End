import { User } from './user.model';
import { OrderItem } from './order-item.model';

export interface Order {
  id: number;
  user: User;
  items: OrderItem[];
  status: string;
}
