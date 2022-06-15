import { of, from, BehaviorSubject } from 'rxjs';
import { map, delay, switchAll, switchMap, mergeMap } from 'rxjs/operators';

const filters = ['brand=porsche', 'model=911', 'horsepower=389', 'color=red'];
const activeFilters = new BehaviorSubject('');

const getData = (params) => {
  return of(`retrieved new data with params ${params}`).pipe(delay(1000));
};

const applyFilters = () => {
  filters.forEach((filter, index) => {
    let newFilters = activeFilters.value;
    if (index === 0) {
      newFilters = `?${filter}`;
    } else {
      newFilters = `${newFilters}&${filter}`;
    }

    activeFilters.next(newFilters);
  });
};

// // using mergeMap
// activeFilters.pipe(
//   mergeMap(param => getData(param))
// ).subscribe(val => console.log(val));

// using switchMap
activeFilters
  .pipe(switchMap((param) => getData(param)))
  .subscribe((val) => console.log(val));

applyFilters();
