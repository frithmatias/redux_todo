import { Component, OnInit } from '@angular/core';
import * as fromFiltro from '../../filter/filter.actions';
import * as fromTodo from '../todo.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';

@Component({
	selector: 'app-todo-footer',
	templateUrl: './todo-footer.component.html',
	styles: []
})
export class TodoFooterComponent implements OnInit {
	pendientes: number;
	filtrosValidos: fromFiltro.filtrosValidos[] = [ 'todos', 'completados', 'pendientes' ];
	filtroActual: fromFiltro.filtrosValidos = 'todos';

	constructor(private store: Store<AppState>) {}

	ngOnInit() {
		this.store.subscribe((state) => {
			// console.log(state);
			this.pendientes = state.todos.filter((todos) => !todos.completado).length;
			this.filtroActual = state.filtro;
		});
	}

	setFiltro(filtro: fromFiltro.filtrosValidos) {
		// Es preferible obtenerlo desde el observable, ya que si yo en el plugin de Redux cambio el estado,
		// no voy a ver los cambios en el template. Por eso no lo hago desde setFiltro().
		// this.filtroActual = filtro;

		const accion = new fromFiltro.SetFiltroAction(filtro);

		// console.log(filtro);
		this.store.dispatch(accion);
	}

	clearCompleted() {
		const accion = new fromTodo.BorrarCompletadosTodoAction();
		this.store.dispatch(accion);
		console.log('Clearing Completed');
	}
}
