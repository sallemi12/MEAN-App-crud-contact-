import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DhashboardComponent } from './dhashboard.component';

describe('DhashboardComponent', () => {
  let component: DhashboardComponent;
  let fixture: ComponentFixture<DhashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DhashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DhashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
