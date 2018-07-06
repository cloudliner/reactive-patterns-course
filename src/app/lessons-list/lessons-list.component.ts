import { Component } from '@angular/core';
import { globalEventBus, Observer } from '../event-bus-experiments/event-bus';
import { Lesson } from '../shared/model/lesson';

@Component({
  selector: 'lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements Observer {
  lessons: Lesson[] = [];
  constructor() {
    console.log('lesson list component is registered as observer ...')
    globalEventBus.registerObserver(this);
  }
  /*
  ngOnInit() {
    console.log('lesson list component is registered as observer ...')
    globalEventBus.registerObserver(this);
  }
   */
  notify(data: Lesson[]) {
    console.log('Lessons list component received data');
    this.lessons = data;
  }
}
