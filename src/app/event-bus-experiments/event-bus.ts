import * as _ from 'lodash';

export interface Observer {
  notifty(data: any);
}

interface Subject {
  registerObserver(obs: Observer);
  unregisterObserver(obs: Observer);
  notifyObservers(data: any);
}

class EventBus implements Subject {
  private observers: Observer[] = [];
  registerObserver(obs: Observer) {
    this.observers.push(obs);
  }
  unregisterObserver(obs: Observer) {
    _.remove(this.observers, el => el === obs);
  }
  notifyObservers(data: any) {
    this.observers.forEach(obs => obs.notifty(data));
  }
}

export const globalEventBus = new EventBus();
