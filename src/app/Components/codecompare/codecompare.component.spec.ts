import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodecompareComponent } from './codecompare.component';

describe('CodecompareComponent', () => {
  let component: CodecompareComponent;
  let fixture: ComponentFixture<CodecompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodecompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodecompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
