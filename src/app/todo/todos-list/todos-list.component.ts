import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Todo } from 'src/app/models/todo.model';

@Component({
	selector: 'app-todos-list',
	templateUrl: './todos-list.component.html',
	styles: []
})
export class TodosListComponent implements OnInit {
	todos: Todo[] = [];
	filtro: string;
	// El Store me va a pedir un tipo, cual es el estado del Store, <AppState>
	// this.store.subscribe((state) => {}) es un observable cuya estructura no la defino en un backend desde una api
	// sino que la estructura la tengo definida en el REDUCER que es un modelo o interface AppState y el nombre del objeto
	// devuelto por el observable esta definido en app.module.ts <AppState>

	constructor(private store: Store<AppState>) {}

	ngOnInit() {
		this.store.subscribe((state) => {
			// console.log(state);
			this.todos = state.todos; // 'todos' es el nombre del objeto devuelto por el observable definido en app.module.ts
			this.filtro = state.filtro;
			// console.log(this.todos);
		});
	}
}
