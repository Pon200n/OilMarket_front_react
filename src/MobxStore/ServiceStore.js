import { makeAutoObservable } from "mobx";

export default class ServiceStore {
  constructor() {
    this._error_message = "";
    makeAutoObservable(this);
  }
  setErrorMessage(error) {
    this._error_message = error;
  }
  get error_message() {
    return this._error_message;
  }
}
