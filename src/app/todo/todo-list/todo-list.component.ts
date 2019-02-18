import {Component, OnInit} from '@angular/core';
import {TodoService} from '../../services/todo.service';
import {Todo} from '../../interface/todo.type';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

    todos: Todo[] = [];

    constructor(private todoService: TodoService) {
    }

    ngOnInit() {
        this.loadItem();
        this.todoService.updated.subscribe(v => v && this.loadItem());
    }

    loadItem() {
        this.todoService.getTodos().subscribe(todos => {
            this.todos = todos;
        });
    }

    updateStatus(todo: Todo) {

        // const item: Todo = {
        //     ...todo
        // };

        this.todoService.atualizarTodo(todo)
            .subscribe(todo => {
                    console.log('atualizado', todo);
                },
                error => {
                    todo.concluido = !todo.concluido;
                    console.log('erro ao atualizar');
                });
    }

    deleteTodo(todo: Todo) {

        let _delete = confirm('Deseja deletar o item?');

        if (!_delete) return;

        this.todoService.deletarTodo(todo)
            .subscribe(res => {
                    this.todos = this.todos.filter((_todo: Todo) => {
                        return _todo.id !== todo.id
                    });
                },
                error => {
                    console.log('erro ao remover', error);
                });

    }
}
