import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/_model/category';
import { CategoryService } from 'src/app/_service/category.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss'],
})
export class CategoriesPageComponent implements OnInit {
  myCat: Category[];
  myError: number = 200;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getAll();
  }

  // ALL:
  getAll() {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.myCat = response;
      },
      error: (err) => {
        this.myError = err.status;
      },
    });
  }
}
