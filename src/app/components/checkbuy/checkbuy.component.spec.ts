import { ComponentFixture, TestBed } from '@angular/core/testing';
import CheckbuyComponent from './checkbuy.component';

describe('CheckbuyComponent', () => {
  let component: CheckbuyComponent;
  let fixture: ComponentFixture<CheckbuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckbuyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckbuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
