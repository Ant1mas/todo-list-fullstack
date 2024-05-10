import { action, makeObservable, observable } from 'mobx'

export const createMobxStore = (props: any) => {
  const store = {
    userData: observable({}),
    setUserData: action(function (newValue: any) {
      store.userData = newValue
    }),
    tasks: observable([]),
    setTasks: action(function (newValue: any) {
      store.tasks = newValue
    }),
    subordinatesData: observable([]),
    setSubordinatesData: action(function (newValue: any) {
      store.subordinatesData = newValue
    }),
  }

  makeObservable(store)

  return store
}
