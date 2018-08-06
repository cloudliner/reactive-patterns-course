import {Component, OnInit} from '@angular/core';
import {Course} from '../shared/model/course';
import {Lesson} from '../shared/model/lesson';
import {tap} from 'rxjs/operators';
import {CoursesService} from '../services/courses.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  courses: Course[];
  latestLessons: Lesson[];

  constructor(private coursesService: CoursesService) { }

  changeCourseData() {
    this.courses.forEach(course => course.description = '=>' + course.description);
  }

  ngOnInit() {

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
