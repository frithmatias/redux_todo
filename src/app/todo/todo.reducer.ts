import * as fromTodo from './todo.actions';
import { Todo } from '../models/todo.model';

const todo1 = new Todo('Vencer a Thanos');
const todo2 = new Todo('Salvar al Mundo');
todo2.completado = true;
const estadoInicial: Todo[] = [ todo1, todo2 ]; // Arreglo de todos

export function todoReducer(state = estadoInicial, action: fromTodo.Acciones): Todo[] {
	// console.log('TODO_STATE:', state); // ARRAY DE OBJETOS (Un objeto por cada TODO)
	// console.log('TODO_ACTION:', action); // OBJETO NUEVO CON LOS DATOS DE TODO NUEVO

	switch (action.type) {
		case fromTodo.AGREGAR_TODO:
			const todo = new Todo(action.texto); // nueva instancia de un todo

			// si hicieramos un state.push(todo) estaríamos mutando el estado actual de "state"
			// y pasa por referencia. Por lo tanto no podríamos rastrear los cambios en las acciones.
			// siempre hay que retornar un NUEVO arreglo.
			console.log([ ...state, todo ]);
			return [ ...state, todo ]; // operador spread, estoy clonando el estado actual. También le mando el nuevo todo.

		case fromTodo.TOGGLE_TODO:
			// Sabemos que SIEMPRE hay que retornar un ESTADO (state). Lo que yo tengo que hacer es IR AL STATE, buscar ESE
			// TODO en particular, MODIFICAR el completado y regresar un NUEVO state. Todo esto teniendo cuidado de que todo
			// lo que retorna TIENE QUE ROMPER toda referencia que JS tiene sobre los objetos. Entonces vamos a usar un
			// return state.map(). En el snippet vemos que retorna UN ARRAY, es muy importante darse cuenta de esto. Si no
			// estamos seguros si la operación que queremos hacer regresa un nuevo arreglo, podemos ir a la documentación
			// en la pagina de mozilla map.
			// https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/map
			// -> El método map() crea UN NUEVO ARRAY con los resultados de la llamada a la función indicada aplicados a cada
			// uno de sus elementos.
			// Entonces yo ya se que el operador map() BARRE todo el arreglo.

			return state.map((todoEdit) => {
				// pensemos que map() es como un forEach()
				if (todoEdit.id === action.id) {
					// Acá hay que tener cuidado, porque si bien map() regresa un nuevo arreglo, los items dentro de ese arreglo
					// 'todoEdit' siguen siendo objetos que son pasados por referencia. De esa forma no sería posible dar un seguimiento
					// a los cambios de estado. Yo tengo que retornar UN NUEVO OBJETO DEL TIPO TODO.
					// Para completado: devuelo el opuesto de todoEdit.completado. Para clonar el resto de las propiedades como el ID
					// y el TEXTO puedo usar el operador spread (...)
					return {
						...todoEdit, // Me CLONA todas las propiedades
						completado: !todoEdit.completado // las que yo ponga explicitamente las va a reemplazar.
					};
					// RECORDAR QUE SIEMPRE HAY QUE REGRESAR NUEVOS ESTADOS nunca MUTAR estados anteriores, esta es la idea de Redux
					// Para poder hacer seguimiento a los estados.
					// Ahora llamamos nuestra acción desde el componente, TODO-ITEM.COMPONENT.TS. (*)
				} else {
					return todoEdit;
				}
			});
		case fromTodo.TOGGLE_ALL_TODO:
			return state.map((todoEdit) => {
				return { ...todoEdit, completado: action.stat };
			});

		case fromTodo.GUARDAR_TODO:
			/*
			console.log(state); // ARRAY DE OBJETOS

				(2) [Todo, Todo]
					0: Todo {texto: "Vencer a Thanos", completado: false, id: 0.0024051808203988667}
					1: Todo {texto: "Salvar al Mundo", completado: true, id: 0.0853432831859553}
					length: 2
					__proto__: Array(0)

			console.log(action); // OBJETO NUEVO

				GuardarTodoAction {id: 0.0024051808203988667, texto: "sss", type: "[TODO] Guardar todo"}
					id: 0.0024051808203988667
					texto: "sss"
					type: "[TODO] Guardar todo"
					__proto__: Object

			*/
			return state.map((todoEdit) => {
				// MAP crea un nuevo array
				if (todoEdit.id === action.id) {
					return {
						...todoEdit,
						texto: action.texto
					};
				} else {
					return todoEdit;
				}
			});

		case fromTodo.BORRAR_TODO:
			// AL BORRAR O AL AGREGAR, SIEMPRE tengo que regresar un arreglo de TODOs
			return state.filter((todoEdit) => todoEdit.id !== action.id);

		case fromTodo.BORRAR_COMPLETADOS_TODO:
			return state.filter((todoEdit) => !todoEdit.completado);

		default:
			return state;
	}
}
