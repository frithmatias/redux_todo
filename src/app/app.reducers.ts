// Este archivo va a servir para concentrar TODOS los reducers de mi aplicación.
// En este archivo vamos a definir el estado que va a tener mi aplicación.

import { ActionReducerMap } from '@ngrx/store';

// Modelos o tipos definidos
import { Todo } from './models/todo.model';
import * as fromFiltroActions from './filter/filter.actions'; // opcional, son opciones validas definidas tipo 'string'

// Reducers
import * as fromTodo from './todo/todo.reducer';
import * as fromFiltro from './filter/filter.reducer';

export interface AppState {
	todos: Todo[];
	filtro: fromFiltroActions.filtrosValidos;
}

export const appReducers: ActionReducerMap<AppState> = {
	todos: fromTodo.todoReducer,
	filtro: fromFiltro.filtroReducer
};
