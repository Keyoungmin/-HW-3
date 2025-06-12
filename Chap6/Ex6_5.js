// 예제 6-5 다양한 constructor 접근 방법
var Person = function (name) {
    this.name = name;
};
var p1 = new Person('사람1');
var p2 = new Person.prototype.constructor('사람2');
var p3 = p1Proto.constructor('사람3');
var p4 = new p1.__proto__.constructor('사람4');
var p5 = new p1.constructor('사람5');

[p1, p2, p3, p4, p5].forEach(function (p) {
    console.log(p, p instanceof Person);
});
