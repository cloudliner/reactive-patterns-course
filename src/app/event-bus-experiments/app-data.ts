import * as _ from 'lodash';
import { Lesson } from '../shared/model/lesson';
import { Subject, Observable, Observer } from 'rxjs';

class DataStore {
  private lessons: Lesson[] = [];
  private lessonsListSubject = new Subject<Lesson[]>();

  public lessonsList$: Observable<Lesson[]> = this.lessonsListSubject.asObservable();

  initializeLessonsList(newList: Lesson[]) {
    this.lessons = _.cloneDeep(newList);
    this.broadcast();
  }

  addLesson(newLesson: Lesson) {
    this.lessons.push(_.cloneDeep(newLesson));
    this.broadcast();
  }

  deleteLesson(deleted: Lesson) {
    _.remove(this.lessons, lesson => lesson.id === deleted.id);
    this.broadcast();
  }

  toggleLessonViewed(toggled: Lesson) {
    const targetLesson = _.find(this.lessons, lesson => lesson.id === toggled.id);
    targetLesson.completed = ! targetLesson.completed;
    this.broadcast();
  }

  broadcast() {
    this.lessonsListSubject.next(_.cloneDeep(this.lessons));
  }
}

export const store = new DataStore();
