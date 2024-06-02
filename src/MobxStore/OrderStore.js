import { makeAutoObservable } from "mobx";

export default class OrderStore {
  constructor() {
    this._order_statuses = [];
    makeAutoObservable(this);
  }
  setStatuses(statuses) {
    this._order_statuses = statuses;
  }
  get order_statuses() {
    return this._order_statuses;
  }
}
