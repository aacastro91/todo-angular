import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
import {TodoService} from '../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  public todoForm: FormGroup;

  public loading = false;

  constructor(private fb: FormBuilder, private todoService: TodoService) {
  }

  ngOnInit() {
    this.todoForm = this.fb.group({
      tarefa: this.fb.control(null, [Validators.required, Validators.minLength(3)]),
      concluido: this.fb.control(false, [Validators.required])
    });
  }

  onRegisterTodo() {

    this.loading = true;

    if (this.todoForm.valid) {
      this.todoService.salvarTodo(this.todoForm.value)
        .subscribe(
          todo => {
            // console.log(todo);
            this.todoForm.reset({concluido: false});
            this.loading = false;
          },
          error => {
            console.log(error);
            this.loading = false;
          }
        );
    }
  }
}
