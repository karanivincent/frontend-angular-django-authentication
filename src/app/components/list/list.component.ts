import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ShoppingItem } from '../../shopping-item.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  items: ShoppingItem[];
  error: any;

  constructor(private api: ApiService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.api.getShoppingItems().subscribe(
      (items: ShoppingItem[]) => this.items = items,
      (error: any) => this.error = error
    );
  }
  add(itemName: string, itemQuantity: number) {
    this.api.createShoppingItem(itemName, itemQuantity).subscribe(
      (item: ShoppingItem) => this.items.push(item),
      (error: any) => this.error = error
    );
  }

  delete(id: number) {
    this.api.deleteShoppingItem(id).subscribe(
      (success: any) => this.items.splice(
        this.items.findIndex(item => item.id === id)
      ),
      (error: any) => this.error = error
    );
  }

  logout() {
    this.auth.logout();
    this.router.navigate([['login']]);
  }
}
