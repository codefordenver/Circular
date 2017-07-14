import ApartmentsSaga from './apartments';

export default function* IndexSaga() {
  yield [
    ApartmentsSaga()
  ];
}
