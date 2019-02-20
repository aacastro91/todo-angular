import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Todo} from '../interface/todo.type';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

interface IResponse {
    data: any[]
}

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    updated: EventEmitter<any> = new EventEmitter();
    private readonly todoUrl: string;

    constructor(private http: HttpClient
    ) {
        this.todoUrl = `${environment.baseURL}/todo/`;
    }

    getTodos(): Observable<Todo[]> {
        return this.http
            .get<IResponse>(`${this.todoUrl}`)
            .pipe(
                map(item => {
                    if (item.data) {
                        return item.data;
                    }
                })
            );
    }

    salvarTodo(todo: Todo): Observable<Todo> {
        return this.http
            .post<Todo>(this.todoUrl, todo)
            .pipe(
                tap(() => this.updated.emit(true))
            );
    }

    atualizarTodo(todo: Todo): Observable<Todo> {
        return this.http
            .put<Todo>(this.todoUrl + todo.id, todo);
    }

    deletarTodo(todo: Todo): Observable<any> {
        return this.http
            .delete<any>(this.todoUrl + todo.id);
    }

}
