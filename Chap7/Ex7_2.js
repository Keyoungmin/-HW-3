// 예제 7-2 Grade 생성자 함수 및 인스턴스
var Grade = function () {
    var args = Array.prototype.slice.call(arguments);
    for (var i = 0; i < args.length; i++) {
        this[i] = args[i];
    }
    this.length = args.length;
};
Grade.prototype = [];
var g = new Grade(100, 80);