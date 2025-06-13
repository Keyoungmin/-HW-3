// 예제 6-8 메서드 오버라이드와 프로토타입 체이닝
var arr = [1, 2];
Array.prototype.toString.call(arr);
Object.prototype.toString.call(arr);
arr.toString(); // 1,2

console.log(arr.toString());

arr.toString = function () {
    return this.join('_');
};
arr.toString(); // 1_2

console.log(arr.toString());