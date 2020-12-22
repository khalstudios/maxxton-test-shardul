import React from 'react';
import { FaPlus } from 'react-icons/fa';

function HeaderComp(props) {
    return (
        <div className="row">
            <div className="col-md-8">
                <h2 style={{ float: "left" }}>ToDo App</h2>
            </div>
            <div className="col-md-4" >
                <button 
                    style={{ float: "right" }} 
                    className="btn btn-primary round" 
                    onClick={() => props.setModal(true)}
                >
                    <FaPlus size="1.5rem" />
                </button>
            </div>
        </div>
    );
}

export default HeaderComp;