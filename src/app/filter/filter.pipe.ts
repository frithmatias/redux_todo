import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo.model';
import * as fromFilter from './filter.actions';

@Pipe({
	name: 'filterTodos'
})
export class FilterPipe implements PipeTransform {
	transform(todos: Todo[], filtro: fromFilter.filtrosValidos): Todo[] {
		// Va a regresar un arreglo de Todo's (: Todo[])
		console.log(todos);
		console.log(filtro);
		switch (filtro) {
			case 'completados':
				return todos.filter((todo) => todo.completado);

			case 'pendientes':
				return todos.filter((todo) => !todo.completado);

			default:
				return todos;
		}
	}
}
