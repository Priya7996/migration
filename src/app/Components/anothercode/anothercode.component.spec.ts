import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnothercodeComponent } from './anothercode.component';

describe('AnothercodeComponent', () => {
  let component: AnothercodeComponent;
  let fixture: ComponentFixture<AnothercodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnothercodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnothercodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
