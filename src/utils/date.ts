/**
 * 한 자리 수를 두 자리 수로 리턴해주는 함수
 * @param number 변경할 숫자
 */
function convertedSingleDigitWithZero(number: number) {
  return number >= 10 ? number : `0${number}`;
}

/**
 * Timestamp를 Date 객체로 리턴해주는 함수
 * @param timestamp 타임스탬프
 */
export function parsedTimestamp(timestamp: number) {
  return new Date(timestamp);
}

/**
 * 타임스탬프를 Date 객체로 변환한 뒤, 어플리케이션에서 사용하는 날짜형식에 맞게 리턴해주는 함수
 * @param timestamp 타임스탬프
 */
export function getConvertedTimestamp(timestamp: number) {
  const date = parsedTimestamp(timestamp);

  const year = date.getFullYear();
  const month = convertedSingleDigitWithZero(date.getMonth() + 1);
  const day = convertedSingleDigitWithZero(date.getDate());
  const hour = convertedSingleDigitWithZero(date.getHours());
  const minute = convertedSingleDigitWithZero(date.getMinutes());
  const seconds = convertedSingleDigitWithZero(date.getSeconds());

  return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분 ${seconds}초`;
}
