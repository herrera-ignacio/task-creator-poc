/*-----------------------------------------------
 Don't edit this file, it is used only for preview.
-----------------------------------------------*/
import React from "react";
import {Provider} from "react-redux";
import ReactDOM from "react-dom"
import {createStore} from "redux";
import tasksReducer, {initialState} from "./reducer"
import TaskCreator from "./TaskCreator";
import TasksList from "./TasksList";

const store = createStore(tasksReducer, initialState)

ReactDOM.render(
	<Provider store={store}>
		<TaskCreator/>
		<TasksList/>
	</Provider>,
	document.getElementById("root")
);
