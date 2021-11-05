import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { taskSaveAction } from './reducer';

const TIMER_RUNNING = 'TIMER_RUNNING';
const TIMER_PAUSED = 'TIMER_PAUSED';
const TIMER_FINISHED = 'TIMER_FINISHED';

function TaskCreator() {
	const [taskName, setTaskName] = useState('');
	const [elapsedSeconds, setElapsedSeconds] = useState(0);
	const [timerState, setTimerState] = useState(TIMER_FINISHED);
	const timer = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		return stopTimer;
	}, [])

	const startTimer = useCallback(() => {
		if (!timer.current) {
			setTimerState(TIMER_RUNNING);
			timer.current = setInterval(tickTimer, 1000);
		}
	}, [timer.current]);

	const handleStopClick = () => {
		saveTask();
		finishTimer();
	};

	const finishTimer = () => {
		stopTimer();
		setElapsedSeconds(0);
		setTimerState(TIMER_FINISHED);
		setTaskName('');
	};

	const pauseTimer = useCallback(() => {
		stopTimer();

		if (timerState === TIMER_RUNNING) {
			setTimerState(TIMER_PAUSED);
		}
	}, [timerState, setTimerState]);

	const resumeTimer = useCallback(() => {
		if (timerState === TIMER_PAUSED) {
			startTimer();
		}
	}, [timerState]);

	const stopTimer = useCallback(() => {
		if (timer.current) {
			clearInterval(timer.current);
			timer.current = null;
		}
	}, [timer.current]);

	const tickTimer = useCallback(() => {
		setElapsedSeconds(v => v + 1);
	}, []);

	const saveTask = () => {
		if (elapsedSeconds > 0) {
			dispatch(taskSaveAction({ name: taskName, seconds: elapsedSeconds }));
		}
	};

	return (
		<div>
			<label>
				Task name
				<input id="taskName"
							 type="text" value={taskName}
							 onChange={(e) => setTaskName(e.target.value)}
				/>
			</label>
			<label>
				Time elapsed
				<input
					id="timeField"
					type="number"
					onFocus={pauseTimer}
					onBlur={resumeTimer}
					onChange={e => setElapsedSeconds(Number(e.target.value))}
					value={elapsedSeconds}
				/>
			</label>
			<button type="button" id="start" onClick={startTimer}>START</button>
			<button type="button" id="stop" onClick={handleStopClick}>STOP</button>
		</div>
	)
}

export default TaskCreator;
