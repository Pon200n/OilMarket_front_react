import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    this._role = "";
    this._orders = [];
    makeAutoObservable(this);
  }
  setThisAuth(bool) {
    this._isAuth = bool;
  }
  setThisUser(user) {
    this._user = user;
  }
  setThisRole(name) {
    this._role = name;
  }
  setOrders(orders) {
    this._orders = orders;
  }
  setUserDefault() {
    this._isAuth = false;
    this._user = {};
    this._role = "";
    this._orders = [];
  }
  get isAuth() {
    return this._isAuth;
  }
  get user() {
    return this._user;
  }
  get role() {
    return this._role;
  }
  get orders() {
    return this._orders;
  }
}
