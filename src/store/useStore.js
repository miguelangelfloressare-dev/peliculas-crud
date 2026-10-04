import { create } from 'zustand';
import axios from 'axios';

// 🔴 REEMPLAZA CON TU ID DE APIBOX
const API_URL = 'https://apibox.vercel.app/mJ9YGrLTknwWIpWhUMaW69FAPfFI3md0/movies'; 

export const useStore = create((set, get) => ({
  movies: [],
  isLoading: false,
  error: null,

  fetchMovies: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(API_URL);
      set({ movies: response.data || [], isLoading: false }); 
    } catch (error) {
      set({ error: 'Error al cargar las películas', isLoading: false });
    }
  },

  addMovie: async (newMovie) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(API_URL, newMovie);
      set({ movies: [...get().movies, response.data], isLoading: false });
    } catch (error) {
      set({ error: 'Error al guardar la película', isLoading: false });
    }
  },

  updateMovie: async (id, updatedData) => {
    set({ isLoading: true, error: null });
    try {
      // 1. Hacemos una copia de los datos y excluimos la propiedad 'id'
      const { id: idExcluido, ...dataParaEnviar } = updatedData;
      
      // 2. Enviamos los datos limpios (sin el id) en la petición PUT
      await axios.put(`${API_URL}/${id}`, dataParaEnviar);
      
      // 3. Actualizamos el estado local
      set({
        movies: get().movies.map(movie => 
          movie.id === id ? { ...movie, ...updatedData } : movie
        ),
        isLoading: false
      });
    } catch (error) {
      console.error("Detalle del error:", error.response); // Esto te ayudará a ver errores futuros
      set({ error: 'Error al actualizar', isLoading: false });
    }
  },

  deleteMovie: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${API_URL}/${id}`);
      set({
        movies: get().movies.filter(movie => movie.id !== id),
        isLoading: false
      });
    } catch (error) {
      set({ error: 'Error al eliminar', isLoading: false });
    }
  }
}));