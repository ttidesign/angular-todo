import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';
import { snapshotChanges } from '@angular/fire/database';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  toDoListArray: any[];
  constructor(private toDoService: TodoService) {}

  ngOnInit(): void {
    this.toDoService
      .getTodoList()
      .snapshotChanges()
      .subscribe((item) => {
        this.toDoListArray = [];
        item.forEach((element) => {
          var x = element.payload.toJSON();
          x['$key'] = element.key;
          this.toDoListArray.push(x);
        });
        this.toDoListArray.sort((a, b) => {
          return a.isChecked - b.isChecked;
        });
      });
  }
  onAdd(itemTitle) {
    this.toDoService.addTitle(itemTitle.value);
    itemTitle = null;
  }
  alterCheck($key: string, isChecked) {
    this.toDoService.checkOrUnCheckedTitle($key, !isChecked);
  }
  onDelete($key: string) {
    this.toDoService.removeTitle($key);
  }
}
