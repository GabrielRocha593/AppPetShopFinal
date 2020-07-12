import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgendamentoListPage } from './agendamento-list.page';

describe('AgendamentoListPage', () => {
  let component: AgendamentoListPage;
  let fixture: ComponentFixture<AgendamentoListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendamentoListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgendamentoListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
