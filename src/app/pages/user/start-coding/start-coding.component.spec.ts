import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCodingComponent } from './start-coding.component';

describe('StartCodingComponent', () => {
  let component: StartCodingComponent;
  let fixture: ComponentFixture<StartCodingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartCodingComponent]
    });
    fixture = TestBed.createComponent(StartCodingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
