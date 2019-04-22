import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers'; // Interface
import { AgregarTodoAction } from '../todo.actions';

@Component({
	selector: 'app-todo-add',
	templateUrl: './todo-add.component.html',
	styles: []
})
export class TodoAddComponent implements OnInit {
	txtInput: FormControl;

	constructor(private store: Store<AppState>) {}

	ngOnInit() {
		this.txtInput = new FormControl('', Validators.required);
	}

	agregarTodo() {
		if (this.txtInput.invalid) {
			return;
		}
		// Aca debo disparar una acción definida en el Reducer, para eso tengo que importar
		// constructor(private store: Store<AppState>) {}
		// el Store me va a pedir un tipo, cual es el estado del Store, <AppState>

		const action = new AgregarTodoAction(this.txtInput.value);
		console.log(action);
		this.store.dispatch(action);
		this.txtInput.setValue('');
		// console.log(this.txtInput.value);
		// console.log(this.txtInput.valid);
	}
}
