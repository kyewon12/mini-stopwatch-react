import React, { useEffect, useRef } from 'react';
import Button from './Button';
import Laps from './Laps';
import Timer from './Timer';
import useTimer from '../hooks/useTimer';

function StopWatch() {
    const { start, pause, centisecond, isRunning, createLap, reset, laps } =
        useTimer();

    const lapResetBtnRef = useRef(null);
    const startStopBtnRef = useRef(null);

    //console(laps)확인용
    useEffect(() => {
        console.log('LAPS', laps);
        return console.log('return'); //이해못하겠둠
    }, [laps]);

    //키보드 L: 랩 L, 리셋 L /  키보드 S: 시작 S, 중단 S
    const handler = (e) => {
        if (e.code === 'KeyL') {
            //lapResetBtn을 클릭하도록
            lapResetBtnRef.current.click();
        }
        if (e.code === 'KeyS') {
            //startStopBtn을 클릭하도록
            startStopBtnRef.current.click();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handler);
        return () => {
            document.removeEventListener('keydown', handler);
        };
    }, []);

    return (
        <section className="w-fit bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col justify-center m-auto mt-36 max-w-sm">
            <Timer centisecond={centisecond} />
            <div className="flex justify-between text-white pb-8 text-sm select-none">
                <Button
                    label={isRunning ? '랩' : '리셋'}
                    code="L"
                    color="bg-gray-600"
                    onClickHandler={isRunning ? createLap : reset} 
                    // => 부모가 바뀔때마다 새로운함수가 return => Button컴포넌트를 memo로 감쌌지만, 렌더링 되는 이유
                    ref={lapResetBtnRef}
                    //ref는 리렌더링되지않는다 -> 렌더링에 영향이 미치지않는다
                />
                <Button
                    label={isRunning ? '중단' : '시작'}
                    code="S"
                    color={isRunning ? 'bg-red-600' : 'bg-green-600'}
                    onClickHandler={isRunning ? pause : start}
                    ref={startStopBtnRef}
                />
            </div>
            <Laps laps={laps} />
        </section>
    );
}

export default StopWatch;
