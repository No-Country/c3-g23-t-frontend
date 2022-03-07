import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/_model/category';
import { CategoryService } from 'src/app/_service/category.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent implements OnInit {
  categories: Category[];
  displayedCategories: Category[];

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.listCategories();
    this.listDisplayedCategories();
  }

  listCategories() {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response;
    });
  }
  listDisplayedCategories() {
    this.categoryService.getCategories().subscribe((response) => {
      this.displayedCategories = response.splice(0, 5);
    });
  }
}
