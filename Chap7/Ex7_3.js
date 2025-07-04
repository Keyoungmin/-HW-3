var Grade = function () {
    var args = Array.prototype.slice.call(arguments);
    for (var i = 0; i < args.length; i++) {
        this[i] = args[i];
    }
    this.length = args.length;
};
Grade.prototype = [];
var g = new Grade(100, 80);

// 예제 7-3 length 프로퍼티를 삭제한 경우

g.push(90);
console.log(g); // Grade { '0': 100, '1': 80, '2': 90, length: 3 }

delete g.length;
g.push(70);
console.log(g); // Grade { '0': 70, '1': 80, '2': 90, length: 1 }