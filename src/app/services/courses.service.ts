import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private db: AngularFireDatabase) { }

  findAllCouses() {
    this.db.list('courses').valueChanges()
      .pipe(
        tap(console.log)
      )
      .subscribe(
        data => this.courses = data
      );
  }
}
