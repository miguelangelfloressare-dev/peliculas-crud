import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function FormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movies, addMovie, updateMovie, isLoading } = useStore();
  
  const [formData, setFormData] = useState({ 
    title: '', 
    director: '', 
    genre: '', 
    year: '' 
  });

  useEffect(() => {
    if (id) {
      const movieToEdit = movies.find(m => m.id === id);
      if (movieToEdit) setFormData(movieToEdit);
    }
  }, [id, movies]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateMovie(id, formData);
    } else {
      await addMovie(formData);
    }
    navigate('/'); // Regresamos al inicio al terminar
  };

  return (
    <div className="form-container">
      <Link to="/" className="btn btn--back">← Volver</Link>
      <h2>{id ? '✏️ Editar Película' : '🍿 Nueva Película'}</h2>
      
      <form className="movie-form" onSubmit={handleSubmit}>
        <input 
          type="text" name="title" value={formData.title} 
          onChange={handleChange} placeholder="Título de la película" required 
        />
        <input 
          type="text" name="director" value={formData.director} 
          onChange={handleChange} placeholder="Director" required 
        />
        <input 
          type="text" name="genre" value={formData.genre} 
          onChange={handleChange} placeholder="Género (Ej. Acción, Drama)" required 
        />
        <input 
          type="number" name="year" value={formData.year} 
          onChange={handleChange} placeholder="Año de estreno" required 
        />
        <button type="submit" className="btn btn--primary" disabled={isLoading}>
          {isLoading ? 'Guardando...' : 'Guardar Película'}
        </button>
      </form>
    </div>
  );
}