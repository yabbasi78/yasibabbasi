import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';

  imageWidth = 50;

  imageMargin = 2;

  showImage: boolean = false;

  filteredProducts: IProduct[] = [];

  product: IProduct = {} as IProduct;

  products: IProduct[] = [];
  
  errorMessage = '';

  sub!: Subscription;
  
  private _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
   
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }

  constructor(private productser: ProductService) { }

  ngOnInit(): void {
    this.sub = this.productser.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().includes(filterBy));
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  onRatingClicked(message: any) {
    this.pageTitle = 'Product List: ' + message;
  }


}
