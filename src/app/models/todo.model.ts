export class Todo {
	public id: number;
	public texto: string;
	public completado: boolean;

	constructor(texto: string) {
		// Solo voy a necesitar el texto para inicializar un TODO
		this.texto = texto.charAt(0).toUpperCase() + texto.slice(1); // Primer letra en mayúscula y todas las demás en minúsculas.
		this.completado = false;
		this.id = Math.random();
	}
}
