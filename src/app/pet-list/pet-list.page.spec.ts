import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PetListPage } from './pet-list.page';

describe('PetListPage', () => {
  let component: PetListPage;
  let fixture: ComponentFixture<PetListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PetListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
