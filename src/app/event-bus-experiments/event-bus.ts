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
  }
  notifyObservers(data: any) {
  }
}
