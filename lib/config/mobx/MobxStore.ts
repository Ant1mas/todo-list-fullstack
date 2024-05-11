import { makeAutoObservable } from 'mobx'

export const createMobxStore = (props: any) => {
  const store = {
    userData: {},
    setUserData(newValue: any) {
      this.userData = newValue
    },
    tasks: [],
    setTasks(newValue: any) {
      this.tasks = newValue
    },
    subordinatesData: [],
    setSubordinatesData(newValue: any) {
      this.subordinatesData = newValue
    },
  }

  makeAutoObservable(store)

  return store
}
