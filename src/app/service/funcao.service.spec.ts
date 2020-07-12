import { TestBed } from '@angular/core/testing';

import { FuncaoService } from './funcao.service';

describe('FuncaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FuncaoService = TestBed.get(FuncaoService);
    expect(service).toBeTruthy();
  });
});
