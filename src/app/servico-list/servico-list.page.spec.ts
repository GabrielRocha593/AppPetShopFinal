import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServicoListPage } from './servico-list.page';

describe('ServicoListPage', () => {
  let component: ServicoListPage;
  let fixture: ComponentFixture<ServicoListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicoListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicoListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
