import { useState, useRef, useCallback } from 'react';

const useTimer = () => {
    //이 내부에 있는 함수들은 100/1초마다 새롭게 리렌더링(호출)된다.
    const [centisecond, setCentisecond] = useState(0);
    const [lapCount, setLapCount] = useState(1);
    const [isRunning, setIsRunning] = useState(false);
    const [timerInterval, setTimerInterval] = useState(null);
    const [laps, setLaps] = useState([]);

    let prevLap = useRef(0); //이전클릭했을때와 지금클릭했을때의 차이를 구하기위해 useRef사용

    //랩시작
    const start = useCallback(() => {
        //100분의 1 초마다 실행
        let _interval = setInterval(() => {
            setCentisecond((prev) => prev + 1);
        }, 10);
        setTimerInterval(_interval);
        setIsRunning((prev) => !prev);
    },[]); //내부에서 state값으로 사용된것이 없기에 []에 빈배열로 된다.(처음실행될때 한번만/ 그후는, 재활용)

    //중단
    const pause =  useCallback(() => {
        clearInterval(timerInterval);
        setTimerInterval(null);
        setIsRunning((prev) => !prev);
    },[timerInterval]);

    //최적화 : usecallback으로 감싸도 centisecond를 참조하고있기때문에 100/1초마다 매번 렌더링될수밖에없다.(할필요x)
    //랩 기록 찍기
    const createLap = () => {
        //랩순번 증가
        setLapCount((prev) => prev + 1);
        const lapTime = centisecond - prevLap.current;
        //배열을 담고있는 배열 형태([랩순번,랩시간])
        //const data = 
        // [
        //     [4, 838],
        //     [3, 229],
        //     [2, 217],
        //     [1, 219],
        // ];
        setLaps((prev) => [[lapCount, lapTime], ...prev]);
        prevLap.current = centisecond;
    };

    const reset = useCallback(() => {
        setCentisecond(0);
        setLapCount(0);
        prevLap.current = 0;
        setLaps([]);
    },[]);

    return { centisecond, start, pause, createLap, reset, isRunning, laps }; //객체 상태로 return
    // return [ centisecond, start, pause, createLap, reset, isRunning, laps ]; //배열 상태로 return
};

export default useTimer;
