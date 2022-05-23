import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseFormConfirmationComponent } from './close-form-confirmation.component';

describe('CloseFormConfirmationComponent', () => {
  let component: CloseFormConfirmationComponent;
  let fixture: ComponentFixture<CloseFormConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseFormConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseFormConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
