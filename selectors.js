export const getMergedTasksFromState = state => Object.values(state.tasks).reduce((tasksMap, task) => {
	const existingTask = tasksMap[task.name];
	const updatedTask = existingTask ? {
		...task,
		id: existingTask.id < task.id ? existingTask.id : task.id,
		seconds: existingTask.seconds + task.seconds,
	} : task;

	return {
		...tasksMap,
		[task.name]: updatedTask,
	};
}, {});

export const tasksSortedById = tasksMap => Object.values(tasksMap)
	.sort((t1, t2) => t1.id - t2.id);

export const secondsSpentInTasks = tasksMap => Object.values(tasksMap)
	.reduce((s, task) => s + task.seconds, 0);
