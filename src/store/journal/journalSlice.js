import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    messageSaved: "",
    notes: [],
    active: null,
    // active: {
    //   id: "ABC123",
    //   title: "",
    //   body: "",
    //   date: 12345657,
    //   imageUrls: [],
    // },
  },
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action /* action */) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action /* action */) => {
      state.active = action.payload;
      state.isSaving = "";
    },
    setNotes: (state, action /* action */) => {
      state.notes = action.payload;
    },
    setSaving: (state, action /* action */) => {
      state.isSaving = true;
      state.isSaving = "";
    },
    updateNote: (state, action /* action */) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        } // verifica que id de la nota actualizada sea el mismo que la nota del arreglo para luego modificarla
        return note;
      });

      state.messageSaved = `${action.payload.title}, Actualizada correctamente`;
    },
    setPhotosToActiveNote: (state, action) => {
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
      state.isSaving = false;
    },
    clearNoteLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = '';
      state.notes = [];
      state.active = null;
    },
    deleteNoteById: (state, action /* action */) => {
      state.active = null;
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewEmptyNote,
  clearNoteLogout,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} = journalSlice.actions;
