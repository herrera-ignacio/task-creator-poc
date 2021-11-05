import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { getMergedTasksFromState, tasksSortedById, secondsSpentInTasks } from "./selectors";

function TasksList() {
	const tasks = useSelector(getMergedTasksFromState);
	const tasksSortedDescById = useMemo(() => tasksSortedById(tasks), [tasks]);
	const totalSeconds = useMemo(() => secondsSpentInTasks(tasks), [tasks]);

	return (
		<div>
			<p id="total">{totalSeconds}</p>
			<ul>
				{tasksSortedDescById.map(t => (
					<li className="task" key={t.id}>
						<span className="id">{t.id}</span>
						<span className="name">{t.name}</span>
						<span className="time">{t.seconds}</span>
					</li>
				))}
			</ul>
		</div>
	)
}

export default TasksList;
