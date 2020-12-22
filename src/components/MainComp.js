import React, { Component } from "react";
import Modal from "react-modal";
import TodoItem from './TodoItem';
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import NavTabs from "./NavTabs";
import SearchAndGroupBar from "./SearchAndGroupBar";
import HeaderComp from "./HeaderComp";
import DeletePopUp from "./DeletePopUp";
import TasksTable from "./TasksTable";
import TaskRowComp from "./TaskRowComp";

Modal.setAppElement('#root');

class MainComp extends Component {

    constructor() {
        super();
        this.state = {
            tabOpen: "All",
            modalAction: "new",
            focusedObj: {
                todo: "",
                summary: "",
                dueDate: "",
                priority: "none",
                status: "Pending",
                createdDate: new Date(),
                unique: 0
            },
            shouldDisable: false,
            isModalOpen: false,
            isDeleteModalOpen: false,
            todoList: [],
            currentList: [],
            searchFilterText: "",
            currentSortColumn: "createdDate",
            currentSortOrder: "none"
        }
        this.setModal = this.setModal.bind(this);
        this.addToDoItem = this.addToDoItem.bind(this);
    }

    setModal(val) {
        if (val === false) {
            this.setState({
                shouldDisable: false, modalAction: "new",
                focusedObj: {
                    todo: "",
                    summary: "",
                    dueDate: "",
                    priority: "none",
                    status: "Pending",
                    createdDate: new Date(),
                    unique: 0
                }
            });
        }
        this.setState({ isModalOpen: val });
    }

    filterTasks = (event) => {
        let list = this.state.todoList.filter((item) => item.todo.toLowerCase().includes(event.target.value.toLowerCase()));
        if (this.state.tabOpen !== "All") {
            list = list.filter((item) => item.status === this.state.tabOpen);
        }
        this.setState({ searchFilterText: event.target.value, currentList: list });
    }

    addToDoItem(obj) {
        if (this.state.modalAction === "new") {
            this.setState((prevState) => {
                let newList = [...prevState.todoList];
                if (newList.length > 0) 
                    newList.unshift(obj);
                else
                    newList.push(obj);
                return ({ todoList: newList, currentList: newList, tabOpen: "All", isModalOpen: false });
            });
        } else {
            this.setState((prevState) => {
                let list = prevState.todoList.map((item) => {
                    if (item.unique === obj.unique)
                        item = { ...obj };
                    return item;
                });
                return { todoList: list, currentList: list, tabOpen: "All", isModalOpen: false, modalAction: "new" };
            });
        }

    }

    handleDelete = toDoItem => {
        this.setState({ focusedObj: toDoItem, isDeleteModalOpen: true });
    }

    confirmDelete = () => {
        this.setState((prevState) => {
            let list = prevState.todoList.filter((item) => item.unique !== prevState.focusedObj.unique);
            return {
                todoList: list, tabOpen: prevState.tabOpen, isDeleteModalOpen: false, focusedObj: {
                    todo: "",
                    summary: "",
                    dueDate: "",
                    priority: "none",
                    status: "Pending",
                    createdDate: new Date(),
                    unique: 0
                }
            };
        }, () => this.handleGrouping(this.state.tabOpen));
    }

    handleGrouping = openTab => {
        let group = [...this.state.todoList];
        if (openTab === "All") {
            this.setState({ currentList: group, tabOpen: openTab });
        } else {
            let list = group.filter((item) => item.status === openTab);
            this.setState({ currentList: list, tabOpen: openTab });
        }
    }

    handleEdit = item => {
        this.setState({ focusedObj: item, modalAction: "edit" }, () => this.setModal(true));
    }

    justDisplay = item => {
        this.setState({ focusedObj: item, modalAction: "edit", shouldDisable: true }, () => this.setModal(true));
    }

    markComplete = current => {
        this.setState((prevState) => {
            let list = prevState.todoList.map((item) => {
                if (item.unique === current.unique) {
                    item.status = "Completed";
                    console.log(item.status);
                }
                return item;
            });
            return { todoList: list };
        }, () => this.handleGrouping(this.state.tabOpen));
    }

    handleDateSort = column => {
        let sort = "none";
        if (this.state.currentSortOrder === "asc") {
            sort = "desc";
        } else if (this.state.currentSortOrder === "desc") {
            sort = "none";
        } else {
            sort = "asc";
        }
        let list = [];
        if (sort === "asc") {
            list = [...this.state.currentList].sort((a, b) => {
                return (new Date(a[column]) - new Date(b[column]));
            });
            console.log(list);
        } else if (sort === "desc") {
            list = [...this.state.currentList].sort((a, b) => {
                return (new Date(b[column]) - new Date(a[column]));
            });
        } else {
            list = [...this.state.currentList];
        }

        this.setState({ currentList: list, currentSortColumn: column, currentSortOrder: sort });
    }

    handleTextSort = column => {
        let sort = "none";
        if (this.state.currentSortOrder === "asc") {
            sort = "desc";
        } else if (this.state.currentSortOrder === "desc") {
            sort = "none";
        } else {
            sort = "asc";
        }
        let list = [];
        if (sort === "asc") {
            list = [...this.state.currentList].sort((a, b) => {
                return (a[column].localeCompare(b[column]));
            });
            console.log(list);
        } else if (sort === "desc") {
            list = [...this.state.currentList].sort((a, b) => {
                return (b[column].localeCompare([column]));
            });
        } else {
            list = [...this.state.currentList];
        }

        this.setState({ currentList: list, currentSortColumn: column, currentSortOrder: sort });
    }

    renderSortIcon = column => {
        if (this.state.currentSortColumn === column && this.state.currentSortOrder === "asc") {
            return <FaSortUp />;
        } else if (this.state.currentSortColumn === column && this.state.currentSortOrder === "desc") {
            return <FaSortDown />;
        } else {
            return <FaSort />;
        }
    }

    handleNoForDeletePopUp = () => {
        this.setState({
            isDeleteModalOpen: false, focusedObj: {
                todo: "",
                summary: "",
                dueDate: "",
                priority: "none",
                status: "Pending",
                createdDate: new Date(),
                unique: 0
            }
        });
    }

    render() {

        const { currentList, searchFilterText } = this.state;

        const displayTaskList = currentList.map((item) => {
            return (
                <TaskRowComp 
                    key={item.unique}
                    taskObject={item}
                    handleDelete={this.handleDelete} 
                    markComplete={this.markComplete}
                    handleEdit={this.handleEdit}
                    justDisplay={this.justDisplay}
                />
            );
        });

        return (

            <div className="container-md" 
                style={
                    {
                        padding: "40px 40px 40px 40px"
                    }
                }
            >
                <HeaderComp setModal={this.setModal} />
                <SearchAndGroupBar searchFilterText={searchFilterText} priority="none" filterTasks={this.filterTasks} />
                <Modal
                    isOpen={this.state.isModalOpen}
                    onRequestClose={() => this.setModal(false)}
                    style={
                        {
                            overlay: {
                                backgroundColor: 'rgba(11, 11, 11, 0.42)',
                            },
                            content: {
                                position: 'absolute',
                                margin: 'auto',
                                width: '700px',
                                height: '450px',
                                padding: '20px'
                            }
                        }
                    }
                >
                    <TodoItem shouldDisable={this.state.shouldDisable} modalAction={this.state.modalAction} toDoObj={this.state.focusedObj} closeModal={this.setModal} addTodo={this.addToDoItem} />
                </Modal>
                <Modal
                    isOpen={this.state.isDeleteModalOpen}
                    onRequestClose={() => this.setState({ isDeleteModalOpen: false })}
                    style={
                        {
                            overlay: {
                                backgroundColor: 'rgba(11, 11, 11, 0.42)',
                            },
                            content: {
                                position: 'absolute',
                                margin: 'auto',
                                width: '500px',
                                height: '400px',
                                border: '1px solid #ccc',
                                padding: '20px'
                            }
                        }
                    }
                >
                    <DeletePopUp 
                        handleNoForDelete={this.handleNoForDeletePopUp} 
                        confirmDelete={this.confirmDelete} 
                        focusedObj={this.state.focusedObj}
                    />
                </Modal>
                <div className="row" style={{ marginTop: "20px" }}>
                    <NavTabs handleGrouping={this.handleGrouping} tabOpen={this.state.tabOpen} />
                    <TasksTable 
                        handleDateSort={this.handleDateSort}
                        handleTextSort={this.handleTextSort} 
                        renderSortIcon={this.renderSortIcon} 
                        displayTaskList={displayTaskList} 
                    />
                </div>
            </div >
        );
    }
}

export default MainComp;