import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Course} from '../shared/model/course';
import {Lesson} from '../shared/model/lesson';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private db: AngularFireDatabase) { }

  findAllCourses(): Observable<Course[]> {
    return this.db.list('courses').valueChanges()
      .pipe(
        tap(console.log)
      );
  }

  findLatestLessons(): Observable<Lesson[]> {
    return this.db.list('lessons', ref => {
      return ref.orderByKey().limitToLast(10);
    }).valueChanges()
      .pipe(
        tap(console.log)
      );
  }
}
