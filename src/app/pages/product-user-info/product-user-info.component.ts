import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/_model/product';
import { ProductsService } from 'src/app/_service/products.service';
import { CustomValidators } from 'src/app/_validators/custom-validators';

@Component({
  selector: 'app-product-user-info',
  templateUrl: './product-user-info.component.html',
  styleUrls: ['./product-user-info.component.scss'],
})
export class ProductUserInfoComponent implements OnInit {
  productDetails: Product = new Product();
  productSalesReport: string;
  stars: number = 0;

  myForm: FormGroup;
  myError: number = 200;
  multipleFiles: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
    this.myForm = this.formBuilder.group({
      // Product:
      product: this.formBuilder.group({
        name: new FormControl(this.productDetails.name, [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhitespace,
        ]),
        price: new FormControl('', [Validators.required]),
        description: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhitespace,
        ]),
        stock: new FormControl('', [Validators.required]),
        content: new FormControl('', [
          Validators.required,
          CustomValidators.notOnlyWhitespace,
        ]),
        discount: new FormControl('', [Validators.required]),
      }),
    });
  }

  handleProductDetails() {
    const prodId: number = +this.route.snapshot.paramMap.get('id');
    this.productsService.getProductDetails(prodId).subscribe((data) => {
      console.log(data);

      this.productDetails = data;
      this.stars = data.rating;
      this.myForm.patchValue({
        product: {
          name: data.name,
          description: data.description,
          content: data.content,
          price: data.price,
          stock: data.stock,
          discount: data.discount,
        },
        profileimage: data.imageProfile,
        postimages: data.imagesPost,
      });
    });
  }
  // *** Getters ***

  get name() {
    return this.myForm.get('product.name');
  }
  get price() {
    return this.myForm.get('product.price');
  }
  get description() {
    return this.myForm.get('product.description');
  }
  get stock() {
    return this.myForm.get('product.stock');
  }
  get content() {
    return this.myForm.get('product.content');
  }
  get discount() {
    return this.myForm.get('product.discount');
  }
  // get profileimage() {
  //   return this.myForm.get('profileimage');
  // }
  // get postimages() {
  //   return this.myForm.get('postimages');
  // }

  // Methods
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = (event.target as HTMLInputElement).files[0];
      this.myForm.patchValue({
        profileimage: file,
      });
      this.myForm.get('profileimage').updateValueAndValidity();
    }
  }

  onFileSelect2(event) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.multipleFiles.push(event.target.files[i]);
    }
  }
  //SUBMIT
  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const formData = new FormData();

    var productBlob = new Blob(
      [JSON.stringify(this.myForm.get('product').value)],
      {
        type: 'application/json',
      }
    );

    formData.append('product', productBlob);
    // formData.append('profileimage', this.myForm.get('profileimage').value);
    // for (var i = 0; i < this.multipleFiles.length; i++) {
    //   formData.append('postimages', this.multipleFiles[i]);
    // }

    this.productsService
      .editCurrentProduct(formData, this.productDetails.id)
      .subscribe({
        next: (response) => {
          alert('Producto Editado!');
          this.router.navigateByUrl('/pages/user-products');
        },
        error: (err) => {
          console.log(err);
          this.myError = err.status;
        },
      });
  }
}
