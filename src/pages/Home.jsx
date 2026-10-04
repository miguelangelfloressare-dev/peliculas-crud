import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import Swal from 'sweetalert2';

export default function Home() {
  const { movies, fetchMovies, deleteMovie, isLoading, error } = useStore();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Eliminar película?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMovie(id);
        Swal.fire('Eliminada', 'La película fue borrada.', 'success');
      }
    });
  };

  return (
    <main className="catalog">
      <header className="catalog__header">
        <h1 className="catalog__title">🎬 Mis Películas</h1>
        <Link to="/create" className="btn btn--primary">Añadir Película</Link>
      </header>
      
      {isLoading && <p className="status">Cargando cartelera...</p>}
      {error && <p className="status status--error">{error}</p>}
      
      <div className="catalog__grid">
        {movies.length === 0 && !isLoading ? <p>No hay películas registradas.</p> : null}
        
        {movies.map(movie => (
          <article key={movie.id} className="movie-card">
            <h3 className="movie-card__title">{movie.title}</h3>
            <p className="movie-card__genre">{movie.genre} - {movie.year}</p>
            <p className="movie-card__director">Dir: {movie.director}</p>
            <div className="movie-card__actions">
              <Link to={`/edit/${movie.id}`} className="btn btn--edit">Editar</Link>
              <button className="btn btn--delete" onClick={() => handleDelete(movie.id)}>
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}