import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoverManifestComponent } from './rover-manifest.component';

describe('RoverManifestComponent', () => {
  let component: RoverManifestComponent;
  let fixture: ComponentFixture<RoverManifestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoverManifestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoverManifestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
