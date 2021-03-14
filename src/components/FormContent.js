import './FormContent.css'

function FormContent(props) {
    return (
        <div className="grid-container movie-sm movie-md movie-lg">
            {props.movies.map(movie => (
                <div key={movie['imbdID']} className="moviecontainer">
                    <div className="img-container">
                        <img src={movie['Poster']} alt={`${movie['Title']} Poster`} className="img" />
                    </div>
                    <p>
                        Title: {movie['Title']}
                    </p>
                    <p>
                        Release Year: {movie['Year']}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default FormContent;
