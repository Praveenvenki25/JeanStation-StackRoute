import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { DiscountsadminComponent } from './discountsadmin.component';

describe('DiscountsadminComponent', () => {
  let component: DiscountsadminComponent;
  let fixture: ComponentFixture<DiscountsadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountsadminComponent ],
      imports: [HttpClientModule, RouterTestingModule, FormsModule, ReactiveFormsModule, MatSnackBarModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountsadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
