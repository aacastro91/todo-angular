import {TestBed, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {TodoComponent} from './todo/todo.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HrComponent} from './hr/hr.component';
import {TodoListComponent} from './todo/todo-list/todo-list.component';
import {HttpClientModule} from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule, ReactiveFormsModule, FormsModule, HttpClientModule
            ],
            declarations: [
                AppComponent, TodoComponent,
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
        }).compileComponents();
    }));

    it('criação do componente app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`Titulo deve ser 'TODO LIST - Angular POC'`, () => {
        let titulo = 'TODO LIST - Angular POC';
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual(titulo);
    });

    // it('should render title in a h1 tag', () => {
    //   const fixture = TestBed.createComponent(AppComponent);
    //   fixture.detectChanges();
    //   const compiled = fixture.debugElement.nativeElement;
    //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to todo!');
    // });
});
