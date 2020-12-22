import React from 'react';

function DeletePopUp(props) {
    return (
        <div>
            <div className="form-group">
                <h4>Do you want to delete this task?</h4>
            </div>
            <b>Task Summary: </b>
            <div className="form-group text-center border">{props.focusedObj.summary}</div>
            <div className="form-group">
                <div className="row justify-content-center" role="toolbar">
                    <div className="col-4">
                        <button onClick={props.handleNoForDelete} className="btn btn-primary mx-1">No</button>
                        <button onClick={props.confirmDelete} className="ms-1 btn btn-danger mx-1">Yes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeletePopUp;