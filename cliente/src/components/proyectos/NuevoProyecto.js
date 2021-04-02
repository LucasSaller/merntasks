import React, { useState, useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {
  // obtener el state del formulario
  const proyectosContext = useContext(proyectoContext);
  const {
    errorFormulario,
    formulario,
    mostrarFormulario,
    agregarProyecto,
    mostrarError,
  } = proyectosContext;

  const [proyecto, setProyecto] = useState({
    nombre: "",
  });
  const { nombre } = proyecto;
  const onChangeProyecto = (e) => {
    setProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // validar el proyecto
    if (nombre === "") {
      mostrarError();
      return;
    }

    // agregar al state
    agregarProyecto(proyecto);

    // reiniciar el form
    setProyecto({
      nombre: "",
    });
  };
  const onClickFormulario = () => {
    mostrarFormulario();
  };

  return (
    <>
      <button
        className="btn btn-block btn-primario"
        type="button"
        onClick={onClickFormulario}
      >
        Nuevo Proyecto{" "}
      </button>{" "}
      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Proyecto"
            name="nombre"
            onChange={onChangeProyecto}
            value={nombre}
          />{" "}
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar Proyecto"
          />
        </form>
      ) : null}
      {errorFormulario ? (
        <p className="mensaje error">El nombre es obligatorio</p>
      ) : null}
    </>
  );
};

export default NuevoProyecto;
