import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";
import {
  savingNewNote,
  addNewEmptyNote,
  setActiveNote,
} from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";

describe("Pruebas en Journal Thunks", () => {
  const dispatch = jest.fn(); //creamos el mock de la funcion
  const getState = jest.fn(); //creamos el mock de la funcion

  beforeEach(() => jest.clearAllMocks()); // lo limpiamos cada vez que inicie un test

  test("startNewNote debe de crear una nueva nota en blanco", async () => {
    const uid = "TEST-UID"; //creamos un uid de prueba
    getState.mockReturnValue({ auth: { uid: uid } }); //creamos el retorno que traeria la función

    await startNewNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(savingNewNote());
    expect(dispatch).toHaveBeenCalledWith(
      addNewEmptyNote({
        body: "",
        title: "",
        id: expect.any(String),
        date: expect.any(Number),
      })
    ); //se espera que sea llamado el metodo del slice con id que viene en string y una fecha en formato number
    expect(dispatch).toHaveBeenCalledWith(
      setActiveNote({
        body: "",
        title: "",
        id: expect.any(String),
        date: expect.any(Number),
      })
    ); //se espera que sea llamado el metodo del slice con id que viene en string y una fecha en formato number

    // Borrar de firebase
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`); //selecciona la collection de firbas que se desea borrar
    const docs = await getDocs(collectionRef); //obtiene los documentos que se desean borrar

    const deletePromises = [];
    docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref))); //agrega un listado de promesas donde se eliminan los documentos al arreglo
    await Promise.all(deletePromises); //los elimina todos como promesas con la funcion deleteDoc
  });
});
