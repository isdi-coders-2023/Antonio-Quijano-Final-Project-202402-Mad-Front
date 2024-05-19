import { ComponentFixture, TestBed } from '@angular/core/testing';
import InsideAppComponent from './inside-app.component';

describe('InsideAppComponent', () => {
  let component: InsideAppComponent;
  let fixture: ComponentFixture<InsideAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsideAppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InsideAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
