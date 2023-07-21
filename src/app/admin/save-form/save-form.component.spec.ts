import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveFormComponent } from './save-form.component';

describe('SaveFormComponent', () => {
  let component: SaveFormComponent;
  let fixture: ComponentFixture<SaveFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveFormComponent]
    });
    fixture = TestBed.createComponent(SaveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
