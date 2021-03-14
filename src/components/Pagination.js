import './Pagination.css'

function Pagination(props) {
    return (
        <div>
            <p>Total items: {props.total}</p>
            <div className="pagination">
                <button onClick={props.onPrev} disabled={props.current === 1}>Prev</button>
                <p className="page">Page {props.current}/{Math.ceil(props.total/10)}</p>
                <button onClick={props.onNext} disabled={props.current === Math.ceil(props.total/10)}>Next</button>
            </div>
        </div>
    );
}

export default Pagination;
