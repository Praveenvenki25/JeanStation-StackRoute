import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { OrdersserviceService } from './ordersservice.service';

describe('OrdersserviceService', () => {
  let service: OrdersserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, FormsModule, ReactiveFormsModule, MatSnackBarModule],
    });
    service = TestBed.inject(OrdersserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
