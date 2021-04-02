import React, { useContext, useState, useEffect } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const FormTarea = () => {
  const [tarea, setTarea] = useState({
    nombre: "",
  });
  const proyectosContext = useContext(proyectoContext);

  const { proyecto } = proyectosContext;
  // Extraer tareas
  const tareasContext = useContext(tareaContext);
  const {
    errorTarea,
    agregarTarea,
    validarTarea,
    obtenerTareas,
    tareaSeleccionada,
    actualizarTarea,
    limpiarTarea,
  } = tareasContext;

  // Effect que detecta si hay una tarea seleccionada
  useEffect(() => {
    if (tareaSeleccionada !== null) {
      setTarea(tareaSeleccionada);
    } else {
      setTarea({
        nombre: "",
      });
    }
  }, [tareaSeleccionada]);

  const { nombre } = tarea;
  // si no hay proyectos seleccionados
  if (!proyecto) return null;
  // Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  const handleChange = (e) => {
    setTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // validar
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }
    // Revisar si es edicion o nueva Tarea
    if (tareaSeleccionada === null) {
      // tarea nueva
      // agregar la nueva tarea al state
      tarea.proyectoId = proyectoActual.id;
      tarea.estado = false;
      agregarTarea(tarea);
    } else {
      // tarea existente
      actualizarTarea(tarea);
      limpiarTarea();
    }

    // obtener y filtrar las tareas
    obtenerTareas(proyectoActual.id);
    // reiniciar el formulario
    setTarea({
      nombre: "",
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={handleSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea..."
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaSeleccionada ? "Editar Tarea" : "Agregar Tarea"}
          />
        </div>
      </form>
      {errorTarea ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTarea;
