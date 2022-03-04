import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/_service/products.service';
import { CustomValidators } from 'src/app/_validators/custom-validators';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  myForm: FormGroup;
  myError: number = 200;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      // Product:
      product: this.formBuilder.group({
        name: new FormControl('', [
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
      // Profile Image
      profileimage: new FormControl('', [Validators.required]),
      // Post Images
      postimages: new FormControl('', [Validators.required]),
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
  get profileimage() {
    return this.myForm.get('profileimage');
  }
  get postimages() {
    return this.myForm.get('postimages');
  }

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
    if (event.target.files.length > 0) {
      const files = (event.target as HTMLInputElement).files;
      this.myForm.patchValue({
        postimages: files,
      });

      this.myForm.get('postimages').updateValueAndValidity();
    }
  }
  //SUBMIT
  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const formData = new FormData();
    var blob = new Blob([JSON.stringify(this.myForm.get('product').value)], {
      type: 'application/json',
    });
    formData.append('product', blob);
    formData.append('profileimage', this.myForm.get('profileimage').value);
    formData.append('postimages', this.myForm.get('postimages').value);
    console.log('postimages', this.myForm.get('postimages').value);

    this.productsService.createNewProduct(formData).subscribe({
      next: (response) => {
        console.log(response);
        alert('Producto cargado con Exito!!!');
        this.router.navigateByUrl('/pages/usuarios');
      },
      error: (err) => {
        this.myError = err.status;
        if (this.myError === 200) {
          alert('Producto cargado con Exito!!!');
          this.router.navigateByUrl('/pages/usuarios');
        }
        setTimeout(() => {
          this.myError = 200;
        }, 3000);
      },
    });
  }
}
