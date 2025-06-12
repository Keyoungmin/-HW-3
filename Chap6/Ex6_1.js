// 예제 6-1 Person.prototype
var Person = function (name) {
    this._name = name;
};
Person.prototype.getName = function () {
    return this._name;
};


var suzi = new Person('suzi');
suzi.__proto__.getName();

Person.prototype === suzi.__proto__

console.log(111);
