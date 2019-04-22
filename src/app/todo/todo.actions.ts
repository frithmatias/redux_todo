import { Action } from '@ngrx/store';
export const AGREGAR_TODO = '[TODO] Agregar todo';
export const TOGGLE_TODO = '[TODO] Toggle check todo';
export const TOGGLE_ALL_TODO = '[TODO] Toggle All check todo';
export const GUARDAR_TODO = '[TODO] Guardar todo';
export const BORRAR_TODO = '[TODO] Borrar todo';
export const BORRAR_COMPLETADOS_TODO = '[TODO] Borrar Completados';

export class AgregarTodoAction implements Action {
	readonly type = AGREGAR_TODO;
	constructor(public texto: string) {}
}

export class ToggleTodoAction implements Action {
	readonly type = TOGGLE_TODO;
	constructor(public id: number) {} // id es el id del checkbox a cambiar.
}

export class ToggleAllTodoAction implements Action {
	readonly type = TOGGLE_ALL_TODO;
	constructor(public stat: boolean) {} // id es el id del checkbox a cambiar.
}

export class GuardarTodoAction implements Action {
	readonly type = GUARDAR_TODO;
	constructor(public id: number, public texto: string) {} // id es el id del checkbox a cambiar.
}

export class BorrarTodoAction implements Action {
	readonly type = BORRAR_TODO;
	constructor(public id: number) {} // id es el id del checkbox a cambiar.
}

export class BorrarCompletadosTodoAction implements Action {
	readonly type = BORRAR_COMPLETADOS_TODO;
	constructor() {}
}

export type Acciones =
	| AgregarTodoAction
	| ToggleTodoAction
	| GuardarTodoAction
	| BorrarTodoAction
	| ToggleAllTodoAction
	| BorrarCompletadosTodoAction;
