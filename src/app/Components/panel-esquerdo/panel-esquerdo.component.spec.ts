import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelEsquerdoComponent } from './panel-esquerdo.component';

describe('PanelEsquerdoComponent', () => {
  let component: PanelEsquerdoComponent;
  let fixture: ComponentFixture<PanelEsquerdoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelEsquerdoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelEsquerdoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
