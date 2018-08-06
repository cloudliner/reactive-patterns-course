import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Course} from '../shared/model/course';
import {Lesson} from '../shared/model/lesson';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  courses: Course[];
  latestLessons: Lesson[];

  constructor(private db: AngularFireDatabase) {
  }

  changeCourseData() {
    this.courses.forEach(course => course.description = '=>' + course.description);
  }

  ngOnInit() {

    this.db.list('courses').valueChanges()
      .pipe(
        tap(console.log)
      )
      .subscribe(
        data => this.courses = data
      );

    this.db.list('lessons', ref => {
      return ref.orderByKey().limitToLast(10);
    }).valueChanges()
      .pipe(
        tap(console.log)
      )
      .subscribe(
        data => this.latestLessons = data
      );
  }
}
