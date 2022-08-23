import { useAuth0 } from "@auth0/auth0-react";

import { LoginButton } from './Login';
import { Profile } from './Profile';
import { LogoutButton } from './Logout';
import './App.css'
import '@picocss/pico'
import React from 'react'
import { app } from "./fb"

export default function App() {

  const { isAuthenticated } = useAuth0();

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
      
      <nav>
        <ul>
          <li><strong>KooDrive</strong></li>
        </ul>
        <ul>
          {isAuthenticated ? (
          <>
            <LogoutButton />
          </>
        ) : (
          <LoginButton />
        )}
          <li><a href="#" role="button">Twitter</a></li>
        </ul>
      </nav>
      <form onSubmit={submitHandler}>
        <input type="text" name="nombre" placeholder='¿Que Pasa?' />
        <label for="file">Subir una imagen
          <input type="file" onChange={archivoHandler} />
        </label>
        
        <button>Publicar</button>
      </form>
      <ul>
        {docus.map((doc) => (
          <li>
            <article>
              <h3>username: {doc.nombre}</h3>
              <p>{doc.nombre}</p>
              <img src={doc.url} />
            </article>
          </li>
        ))}
      </ul>
    </main>
  )
}
