import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUserInfoComponent } from './product-user-info.component';

describe('ProductUserInfoComponent', () => {
  let component: ProductUserInfoComponent;
  let fixture: ComponentFixture<ProductUserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductUserInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
