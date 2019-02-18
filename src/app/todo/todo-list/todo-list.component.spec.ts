import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TodoListComponent} from './todo-list.component';
import {HttpClientModule} from '@angular/common/http';
import {of, throwError} from 'rxjs';
import {TodoService} from '../../services/todo.service';

import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {FormsModule} from '@angular/forms';


describe('TodoListComponent', () => {
    let component: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;
    // let getTodosSpy: Spy;
    let de: DebugElement;


    const tarefas = {
        data: [
            {id: 1, tarefa: 'Tarefa 1', concluido: false},
            {id: 2, tarefa: 'Tarefa 2', concluido: false}
        ]
    };

    const tarefa = {
        data: [
            {id: 2, tarefa: 'Nova tarefa', concluido: true}
        ]
    };

    let httpClientSpy;
    // let httpClientSpy: {
    //     get: jasmine.Spy
    // };
    let todoService: TodoService;

    // const todoService = jasmine.createSpyObj('TodoService', ['getTodos']);

    beforeEach(async(() => {
        // TestBed.configureTestingModule({
        //     imports: [HttpClientModule],
        //     declarations: [TodoListComponent]
        // })
        //     .compileComponents();

        // getTodosSpy = todoService.getTodos.and.returnValue( of(tarefas) );
        // todoService.updated.and.returnValue( of(true));

        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'put', 'delete']);

        todoService = new TodoService(httpClientSpy as any);

        TestBed.configureTestingModule({
            imports: [HttpClientModule, FormsModule],
            declarations: [TodoListComponent],
            providers: [
                {provide: TodoService, useValue: todoService}
            ]
        }).compileComponents();

    }));

    beforeEach(() => {

        // TestBed.configureTestingModule({
        //     imports: [HttpClientModule],
        //     declarations: [TodoListComponent],
        //     providers:    [
        //         { provide: TodoService, useValue: todoService }
        //     ]
        // });

        fixture = TestBed.createComponent(TodoListComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement;

        httpClientSpy.get.and.returnValue(of(tarefas));
        httpClientSpy.put.and.returnValue(of(tarefa));
        httpClientSpy.delete.and.returnValue(of(null));

        // fixture.detectChanges();
    });

    it('componente criado', () => {
        expect(component).toBeTruthy();
    });

    it('exibir os itens exisitente', () => {
        expect(component.todos.length).toBe(0);
        fixture.detectChanges(); // onInit
        expect(component.todos.length).toBe(2, 'não retornou dois itens');

        const displayCount = de.queryAll(By.css('li')).length;
        expect(displayCount).toBe(2);

        expect(httpClientSpy.get.calls.count()).toBe(1);
    });

    it('Atualizar quando houver mudança', () => {
        fixture.detectChanges();
        expect(component.todos.length).toBe(2, 'não retornou dois itens');

        httpClientSpy.get.and.returnValue(of({
            data: [
                {tarefa: 'Tarefa 1', concluido: false}
            ]
        }));
        todoService.updated.emit(true);
        expect(component.todos.length).toBe(1, 'não retornou dois itens');

    });

    it('Concluir um item', () => {
        fixture.detectChanges();

        const task = de.query(By.css('#item-1')).nativeElement;

        expect(task.checked).toBe(false);
        task.click();
        // fixture.detectChanges();
        expect(task.checked).toBe(true);
        expect(httpClientSpy.put.calls.count()).toBe(1);
    });

    it('Testando requisição com erro', () => {
        fixture.detectChanges();

        const task = de.query(By.css('#item-2')).nativeElement;

        httpClientSpy.put.and.returnValue(throwError(
            {
                message: 'The given data was invalid.',
                errors: {
                    tarefa: [
                        'The tarefa field is required.'
                    ],
                    concluido: [
                        'The concluido field is required.'
                    ]
                }
            }
        ));

        expect(task.checked).toBe(false, 'Antes de clicar para concluir');
        task.click();
        fixture.detectChanges();
        setTimeout(() => {
            expect(task.checked).toBe(false, 'Erro na request e não conclui');
        }, 1);

        expect(httpClientSpy.put.calls.count()).toBe(1);
    });

    it('Deletando uma tarefa existente', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        fixture.detectChanges();
        const deleteButton = de.query(By.css('#delete-button-item-2')).nativeElement;
        expect(component.todos.length).toBe(2);
        deleteButton.click();
        expect(component.todos.length).toBe(1);
    });

    it('Deletando uma tarefa existente, mas cancelando na pergunta', () => {
        spyOn(window, 'confirm').and.returnValue(false);
        fixture.detectChanges();
        const deleteButton = de.query(By.css('#delete-button-item-2')).nativeElement;
        expect(component.todos.length).toBe(2);
        deleteButton.click();
        expect(component.todos.length).toBe(2);
    });

    it('Erro ao tentar remover uma tarefa', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        fixture.detectChanges();
        const deleteButton = de.query(By.css('#delete-button-item-2')).nativeElement;

        httpClientSpy.delete.and.returnValue(throwError(
            {
                message: 'erro ao deletar'
            }
        ));

        expect(component.todos.length).toBe(2);
        deleteButton.click();
        expect(component.todos.length).toBe(2);
    });
});
