import * as fromFiltro from './filter.actions';

const estadoInicial: fromFiltro.filtrosValidos = 'todos';

export function filtroReducer(state = estadoInicial, action: fromFiltro.acciones): fromFiltro.filtrosValidos {
	// console.log('FILTER_STATE:', state); // ARRAY DE OBJETOS (Un objeto por cada TODO)
	// console.log('FILTER_ACTION:', action); // OBJETO NUEVO CON LOS DATOS DE TODO NUEVO
	// Este reducer va a regresar algo del tipo 'fromFiltro.filtrosValidos'. ('todos' | 'completados' | 'pendientes')
	console.log('state:', state);
	console.log('action:', action);
	/*
	state: todos			
	action:
		SetFiltroAction {filtro: "completados", type: "[Filter] Set Filtro"}
			filtro: "completados"
			type: "[Filter] Set Filtro"
			__proto__: Object
	*/
	switch (action.type) {
		case fromFiltro.SET_FILTRO:
			return action.filtro; // filtro es un argumento requerido por el constructor de la clase setFiltroAction, (SET_FILTRO)
		default:
			return state;
	}
}
