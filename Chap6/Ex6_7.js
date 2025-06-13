// 예제 6-7 배열에서 배열 메서드 및 객체 메서드 실행
var arr = [1, 2];
arr(.__proto__).push(3);
arr(.__proto__)(__proto__).hasOwnProperty(2);