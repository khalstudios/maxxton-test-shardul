import React from "react";

function NavTabs(props) {
    return (
        <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
                <a className={props.tabOpen === "All" ? "nav-link active" : "nav-link"}
                    onClick={() => props.handleGrouping("All")}
                    id="home-tab" data-bs-toggle="tab" href="#home" role="tab" aria-selected="true">All</a>
            </li>
            <li className="nav-item" role="presentation">
                <a className={props.tabOpen === "Pending" ? "nav-link active" : "nav-link"}
                    onClick={() => props.handleGrouping("Pending")}
                    data-bs-toggle="tab" href="#profile" role="tab" aria-selected="false">Pending</a>
            </li>
            <li className="nav-item" role="presentation">
                <a className={props.tabOpen === "Completed" ? "nav-link active" : "nav-link"}
                    onClick={() => props.handleGrouping("Completed")}
                    data-bs-toggle="tab" href="#contact" role="tab" aria-selected="false">Completed</a>
            </li>
        </ul>
    );
}

export default NavTabs;