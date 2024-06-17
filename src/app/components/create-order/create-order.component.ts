import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { Product } from '../../models/product.model';
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {
  orderForm: FormGroup;
  products: Product[] = [];
  users: User[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private userService: UserService,
    private orderService: OrderService
  ) {
    this.orderForm = this.fb.group({
      user: this.fb.group({
        id: ''
      }),
      customerName: '',
      status: 'Pendiente',
      items: this.fb.array([])
    });
  }

  ngOnInit() {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  get items(): FormArray {
    return this.orderForm.get('items') as FormArray;
  }

  addItem() {
    const itemForm = this.fb.group({
      product: this.fb.group({
        id: ''
      }),
      quantity: 1
    });
    this.items.push(itemForm);
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  submitOrder() {
    const order = this.orderForm.value;
    console.log('Submitting order:', order);

    this.orderService.createOrder(order).subscribe({
      next: (res) => console.log('Order created!', res),
      error: (err) => console.error('Error creating order:', err)
    });
  }
}
