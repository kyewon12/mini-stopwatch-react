import React,{ memo }  from 'react';
import formatTime from '../util/formatTime';

function Laps({ laps }) {
    //누산기acc 작업이 더 유용 : reduce 함수
    const lapTimeArr = laps.reduce((acc, cur) => [...acc, cur[1]], []);
    //acc : 축적 / cur : 현재값
    console.log('laps', laps); //2차원배열
    console.log('lapTimeArr', lapTimeArr); //1차원배열

    //Math.max(1,2,3) 최댓값/ Math.min(1,2,3) 최솟값
    const maxIdx = lapTimeArr.indexOf(Math.max(...lapTimeArr));
    const minIdx = lapTimeArr.indexOf(Math.min(...lapTimeArr));

    const minMaxStyle = (idx) => {
        if(laps.length < 2) return;
        if(idx === maxIdx) return 'text-red-600';
        if(idx === minIdx) return 'text-green-600';
    }

    //배열하나하나의 원소를 콜백시켜주는 함수 : forEach
    const lapTimeArr2 = [];
    laps.forEach((lap) => lapTimeArr2.push(lap[1]));

    return (
        <article className="text-gray-600 h-64 overflow-auto border-t-2">
            <ul id="laps">
                {/* map함수에서 두번째 파라미터로 'index'를 가져올수있음 -> key={index} 값 가져오는건 안좋은 방법!!*/}
                {laps.map((lap,idx) => (
                    <li
                        className={`flex justify-between py-2 px-3 border-b-2 ${minMaxStyle(idx)}`}
                        key={lap[0]}
                    >
                        <span>랩 {lap[0]}</span>
                        <span>{formatTime(lap[1])}</span>
                    </li>
                ))}
            </ul>
        </article>
    );
}

export default memo(Laps);
