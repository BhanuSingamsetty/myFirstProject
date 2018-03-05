import { FilterPipe } from './app.filter.pipe';

describe('filter pip functionality', () => {
    beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

   it('Check for filter result', () => {
      let  citiesLists = [{"name": "Bengaluru", "code":"BLR"}, {"name": "Delhi", "code":"DEL"}, {"name": "Pune", "code":"PUN"},{"name": "Telangana", "code":"TS"},];
      var filter = $filter('Bengaluru');
      expect(filter).toEqual('Bengaluru');
   })
  })
