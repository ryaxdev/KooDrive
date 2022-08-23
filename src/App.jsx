import './App.css'
import '@picocss/pico'
import React from 'react'
import { app } from "./fb"

export default function App() {

  const [archivoUrl, setArchivoUrl] = React.useState("");
  const [docus, setDocus] = React.useState([]);

  const archivoHandler = async (e) => {
    const archivo = e.target.files[0];
    const storageRef = app.storage().ref();
    const archivoPath = storageRef.child(archivo.name);
    await archivoPath.put(archivo);
    console.log("archivo cargado:", archivo.name);
    const enlaceUrl = await archivoPath.getDownloadURL();
    setArchivoUrl(enlaceUrl);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const nombreArchivo = e.target.nombre.value;
    if (!nombreArchivo) {
      alert("coloca un nombre");
      return;
    }
    const coleccionRef = app.firestore().collection("archivos");
    const docu = await coleccionRef
      .doc(nombreArchivo)
      .set({ nombre: nombreArchivo, url: archivoUrl });
    console.log("archivo cargado:", nombreArchivo, "ulr:", archivoUrl);
    window.location = "/";
  };

  React.useEffect(async () => {
    const docusList = await app.firestore().collection("archivos").get();
    setDocus(docusList.docs.map((doc) => doc.data()));
  }, []);

  return (
    <main class="container">
      <form onSubmit={submitHandler}>
        <input type="file" onChange={archivoHandler} />
        <input type="text" name="nombre" placeholder='¿Que Pasa?' />
        <button>Publicar</button>
      </form>
      <ul>
        {docus.map((doc) => (
          <li>
            <h3>{doc.nombre}</h3>
            <img src={doc.url}  />
          </li>
        ))}
      </ul>
    </main>
  )
}
