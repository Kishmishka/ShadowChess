import create from 'zustand';

interface useTumerObject{
	goTimer: boolean;
	startTime:number;
	bonusTime: number;
	showTime: boolean;
	setGoTimer:(flag:boolean)=>void;
	setStartTime:(time:number)=>void;
	
}

export const useTimer = create<useTumerObject>(set => ({
	goTimer:  false,
	showTime: false,
	startTime:10,
	bonusTime:0,
	setGoTimer:  (flag:boolean)=>set({goTimer:flag}),
	setStartTime:(time:number)=>set({startTime:time}),
	setBonusTime:(time:number)=>set({bonusTime:time}),
	setShowTime: (flag:boolean)=>set({showTime:flag}),
}))