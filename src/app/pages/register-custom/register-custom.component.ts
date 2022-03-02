import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterCustomService } from 'src/app/_service/register-custom.service';
import { CustomValidators } from 'src/app/_validators/custom-validators';

@Component({
  selector: 'app-register-custom',
  templateUrl: './register-custom.component.html',
  styleUrls: ['./register-custom.component.scss'],
})
export class RegisterCustomComponent implements OnInit {
  myForm: FormGroup;
  myError: number = 200;

  constructor(
    private router: Router,
    private registerService: RegisterCustomService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        CustomValidators.notOnlyWhitespace,
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]+@[a-z0-9.-]+\\.[a-z]{2,8}$'),
        CustomValidators.notOnlyWhitespace,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        CustomValidators.notOnlyWhitespace,
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        CustomValidators.notOnlyWhitespace,
      ]),
      surname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        CustomValidators.notOnlyWhitespace,
      ]),
      country: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        CustomValidators.notOnlyWhitespace,
      ]),
      state: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        CustomValidators.notOnlyWhitespace,
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        CustomValidators.notOnlyWhitespace,
      ]),
      imageProfile: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        CustomValidators.notOnlyWhitespace,
      ]),
    });
  }

  onSubmit(): void {
    this.registerService.register(this.myForm.value).subscribe((data) => {
      this.router.navigate(['/pages/usuarios']);
    });
  }
}
