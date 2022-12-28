//공용 함수

//formatString : 숫자 출력시, 항상 두자리수로 출력하기위해(5(x) -> 05(o))
const formatString = (num) => (num<10 ? '0' + num :num)

//formatTime : 분/초/형식으로 변환하는 함수
const formatTime = (centisecond) =>{
  let formattedString ='';
  const min = parseInt(centisecond / 6000);
  const sec = parseInt((centisecond - 6000 * min)/100);
  const centisec = centisecond % 100;
  formattedString = `${formatString(min)} : ${formatString(sec)}.${formatString(centisec)}`;
  return formattedString
}

export default formatTime;