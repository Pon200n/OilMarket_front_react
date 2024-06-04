import { makeAutoObservable } from "mobx";

export default class OrderStore {
  constructor() {
    this._order_statuses = [];
    this._user_basket_products = [];
    makeAutoObservable(this);
  }
  setStatuses(statuses) {
    this._order_statuses = statuses;
  }
  setUserBasketProducts(products) {
    this._user_basket_products = products;
  }
  get order_statuses() {
    return this._order_statuses;
  }
  get user_basket_products() {
    return this._user_basket_products;
  }
}
