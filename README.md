# -HW-3

코어 자바스크립트 예제 풀이입니다

---
## Chapter 6
---

### Ex 6-1
- new 연산자를 통해 생성자 함수를 호출하면 새로운 인스턴스가 생성됨
- 이때 인스턴스의 __proto__ 프로퍼티는 생성자 함수의 prototype 프로퍼티를 참조하게 됨

```
// 예제 6-1 Person.prototype
var Person = function (name) {
    this._name = name;
};
Person.prototype.getName = function () {
    return this._name;
};
```

### Ex 6-2
- 생성자 함수, 프로토타입 객체, 그리고 인스턴스 간의 내부 구조를 시각적으로 확인
- console.dir를 통해 생성자 함수는 prototype 프로퍼티를, 인스턴스는 __proto__ 프로퍼티를 가지며 둘이 연결되어 있음음

```
// 예제 6-2 prototype과 __proto__
var Constructor = function (name) {
    this.name = name;
};
Constructor.prototype.method1 = function () {};
Constructor.prototype.property1 = 'Constructor Prototype Property';

var instance = new Constructor('Instance');

console.dir(Constructor);
console.dir(instance);
```

```
// 실행 결과
[Function: Constructor]
Constructor { name: 'Instance' }
```

### Ex 6-3
- 인스턴스의 constructor 프로퍼티가 생성자 함수 자신을 가리키고 있음
- 인스턴스에서 constructor 프로퍼티에 접근하면, 프로토타입 - - 체인을 통해 __proto__.constructor에 접근하게 됨
- 이를 이용해 원본 생성자 함수를 알지 못해도 새로운 인스턴스를 생성할 수 있음

```
// 예제 6-3 constructor 프로퍼티
var arr = [1, 2];
Array.prototype.constructor === Array // true
arr.__proto__.constructor === Array   // true
arr.constructor === Array             // true

var arr2 = new arr.constructor(3, 4);
console.log(arr2); // [3, 4]
```

```
// 실행 결과
[ 3, 4 ]

```


### Ex 6-4
- 어떤 객체의 constructor 프로퍼티는 얼마든지 다른 값으로 변경될 수 있음을 보임
- constructor를 변경하더라도 instanceof 연산자의 결과는 바뀌지 않음. 
- instanceof는 constructor가 아닌 프로토타입 체인을 통해 상속 관계를 확인하기 때문임

```
// 예제 6-4 constructor 변경
var NewConstructor = function () {
    console.log('this is new constructor!');
};
var dataTypes = [
    1,
    'test', 
    true, 
    {}, 
    [], 
    function () {}, 
    /test/,
    new Number(), 
    new String(), 
    new Boolean(), 
    new Object(), 
    new Array(),
    new Function(), 
    new RegExp(), 
    new Date(), 
    new Error()
];

dataTypes.forEach(function (d) {
    d.constructor = NewConstructor;
    console.log(d.constructor.name, '&', d instanceof NewConstructor);
});
```

```
// 실행 결과
Number & false
String & false
Boolean & false
NewConstructor & false
NewConstructor & false
NewConstructor & false
NewConstructor & false
NewConstructor & false
NewConstructor & false
NewConstructor & false
NewConstructor & false
NewConstructor & false
NewConstructor & false
NewConstructor & false
NewConstructor & false
NewConstructor & false
```


### Ex 6-5
- 인스턴스, 생성자 함수의 프로토타입, 인스턴스의 __proto__ 등 다양한 경로를 통해 원래의 생성자 함수에 접근할 수 있음을 보여줌
- 어떤 방법을 사용하든 결국 동일한 생성자 함수를 가리키게 되며, 모두 Person의 인스턴스임

```
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

```
