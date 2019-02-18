import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TodoComponent} from './todo.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HrComponent} from '../hr/hr.component';
import {TodoListComponent} from './todo-list/todo-list.component';
import {HttpClientModule} from '@angular/common/http';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {TodoService} from '../services/todo.service';
import {of, throwError} from 'rxjs';

describe('TodoComponent', () => {
    let component: TodoComponent;
    let fixture: ComponentFixture<TodoComponent>;
    let de: DebugElement;

    const tarefa = {
        data: [
            {
                tarefa: 'Lavar banheiro',
                concluido: '0',
                updated_at: '2019-02-12 21:04:52',
                created_at: '2019-02-12 21:04:52',
                id: 5
            }
        ]
    };

    const tarefas = {
        data: []
    };

    let httpClientSpy;
    let todoService: TodoService;

    beforeEach(async(() => {

        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);

        todoService = new TodoService(httpClientSpy as any);

        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule, FormsModule, HttpClientModule
            ],
            declarations: [TodoComponent, HrComponent, TodoListComponent],
            providers: [
                {provide: TodoService, useValue: todoService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement;
        httpClientSpy.get.and.returnValue(of(tarefas));
        httpClientSpy.post.and.returnValue(of(tarefa));

        fixture.detectChanges();

    });

    it('Criar componente', () => {
        expect(component).toBeTruthy();
    });


    it('Verifica se o form está inválido', () => {
        expect(component.todoForm.invalid).toBe(true);
        const salvarButton = de.query(By.css('#button-adicionar-tarefa')).nativeElement;
        expect(salvarButton.disabled).toBe(true);
    });


    it('Preencher a tarefa', () => {
        component.todoForm.get('tarefa').setValue('Lavar banheiro');
        expect(component.todoForm.valid).toBe(true);

        const salvarButton = de.query(By.css('#button-adicionar-tarefa')).nativeElement;
        fixture.detectChanges();
        expect(salvarButton.disabled).toBe(false);
    });

    it('Salvar um item', () => {
        component.todoForm.get('tarefa').setValue('Lavar banheiro');
        const salvarButton = de.query(By.css('#button-adicionar-tarefa')).nativeElement;
        fixture.detectChanges();
        salvarButton.click();
        fixture.detectChanges();
        expect(component.todoForm.invalid).toBe(true, 'Form invalido após salvar um item');
        expect(salvarButton.disabled).toBe(true, 'botão desabilitado spós salvar um item');
    });


    it('Erro ao salvar um item', () => {

        httpClientSpy.post.and.returnValue(
            throwError({
                message: 'The given data was invalid.',
                errors: {
                    tarefa: [
                        'The tarefa field is required.'
                    ]
                }
            })
        );

        let task = 'Lavar banheiro';

        component.todoForm.get('tarefa').setValue(task);

        const salvarButton = de.query(By.css('#button-adicionar-tarefa')).nativeElement;

        fixture.detectChanges();

        salvarButton.click();

        fixture.detectChanges();

        expect(component.todoForm.valid).toBe(true);
        expect(component.todoForm.get('tarefa').value).toBe(task);

    });


});
