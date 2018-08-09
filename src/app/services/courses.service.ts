import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
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

  findCourseByUrl(courseUrl: string): Observable<Course> {
    return this.db.list('courses', ref => {
      return ref.orderByChild('url').equalTo(courseUrl);
    }).snapshotChanges()
      .pipe(
        map(data => {
          return {
            id: data[0].payload.key,
            ...data[0].payload.val() as Course
          };
        })
      );
  }

  findLessonsForCourse(courseId: string): Observable<Lesson[]> {
    return this.db.list('lessons', ref => {
      return ref.orderByChild('courseId').equalTo(courseId);
    }).valueChanges() as Observable<Lesson[]>;
  }
}
