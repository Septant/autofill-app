import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutofillDropdownComponent } from './autofill-dropdown.component';

describe('AutofillDropdownComponent', () => {
  let component: AutofillDropdownComponent;
  let fixture: ComponentFixture<AutofillDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutofillDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutofillDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
