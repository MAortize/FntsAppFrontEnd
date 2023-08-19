import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoOverComponent } from './go-over.component';

describe('GoOverComponent', () => {
  let component: GoOverComponent;
  let fixture: ComponentFixture<GoOverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoOverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
