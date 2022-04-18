import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { ProductadminService } from './productadmin.service';

describe('ProductadminService', () => {
  let service: ProductadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, FormsModule, ReactiveFormsModule, MatSnackBarModule],
    });
    service = TestBed.inject(ProductadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
