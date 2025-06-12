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
- console.dir를 통해 생성자 함수는 prototype 프로퍼티를, 인스턴스는 __proto__ 프로퍼티를 가지며 둘이 연결되어 있음을 보여줌

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


