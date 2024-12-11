class Estudiante {
    constructor(id, nombre, apellido, edad) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.calificaciones = [];
    }

    registrarNota(nota) {
        this.calificaciones.push(parseFloat(nota));
    }

    calcularPromedio() {
        if (this.calificaciones.length === 0) return 0;
        return this.calificaciones.reduce((a, b) => a + b) / this.calificaciones.length;
    }

    verificarAprobacion() {
        return this.calcularPromedio() >= 3.0;
    }
}

// Clase GestorEstudiantes
class GestorEstudiantes {
    constructor() {
        this.estudiantes = [];
    }

    agregarEstudiante(estudiante) {
        if (this.estudiantes.length < 4) {
            this.estudiantes.push(estudiante);
            this.actualizarTabla();
        } else {
            alert('Ya se ha alcanzado el límite de 4 estudiantes');
        }
    }

    actualizarTabla() {
        const tbody = document.querySelector('#tablaEstudiantes tbody');
        tbody.innerHTML = '';
        
        this.estudiantes.forEach(estudiante => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${estudiante.id}</td>
                <td>${estudiante.nombre}</td>
                <td>${estudiante.apellido}</td>
                <td>${estudiante.edad}</td>
                <td>
                    <button onclick="registrarNota('${estudiante.id}')">Registrar Nota</button>
                    <button onclick="verPromedio('${estudiante.id}')">Ver Promedio</button>
                    <button onclick="verificarAprobacion('${estudiante.id}')">Verificar Aprobación</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    encontrarEstudiante(id) {
        return this.estudiantes.find(est => est.id === id);
    }
}

// Instancia global del gestor
const gestor = new GestorEstudiantes();

// Funciones de interfaz
function agregarEstudiante() {
    const id = document.getElementById('id').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const edad = document.getElementById('edad').value;

    if (id && nombre && apellido && edad) {
        const estudiante = new Estudiante(id, nombre, apellido, edad);
        gestor.agregarEstudiante(estudiante);
        limpiarFormulario();
    } else {
        alert('Por favor complete todos los campos');
    }
}

function registrarNota(id) {
    const nota = prompt('Ingrese la nota:');
    if (nota !== null && !isNaN(nota)) {
        const estudiante = gestor.encontrarEstudiante(id);
        if (estudiante) {
            estudiante.registrarNota(nota);
            alert('Nota registrada exitosamente');
        }
    }
}

function verPromedio(id) {
    const estudiante = gestor.encontrarEstudiante(id);
    if (estudiante) {
        const promedio = estudiante.calcularPromedio();
        alert(`El promedio es: ${promedio.toFixed(2)}`);
    }
}

function verificarAprobacion(id) {
    const estudiante = gestor.encontrarEstudiante(id);
    if (estudiante) {
        const aprobado = estudiante.verificarAprobacion();
        alert(aprobado ? 'El estudiante ha aprobado' : 'El estudiante no ha aprobado');
    }
}

function limpiarFormulario() {
    document.getElementById('id').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('edad').value = '';
}