import {
  collection,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadNotes } from "../../helpers";
import { fileUpload } from "../../helpers/fileUpload";
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} from "./journalSlice";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());

    //uid
    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      imageUrls: [],
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;
    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) return new Error("El UID del usuario no existe");

    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const noteToFireStore = { ...note };
    delete noteToFireStore.id; //Elimina el id de las propiedades que vienen de note

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`); //refrencia de la nota que será modificada en firebase
    await setDoc(docRef, noteToFireStore, { merge: true }); //actualizar las nota en los documentos de firebase

    dispatch(updateNote(note));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());

    // await fileUpload( files[0] );
    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    } //pasar los elementos de un arreglo a otro(fileUploadPromises)

    const photosUrls = await Promise.all(fileUploadPromises); //lo convierte en un arreglo con todas las promesas respondidas
    dispatch(setPhotosToActiveNote(photosUrls));
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`); //referencia del documento en firebase
    await deleteDoc(docRef);

    dispatch(deleteNoteById(note.id))
  };
};
