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
- console.dir를 통해 생성자 함수는 prototype 프로퍼티를, 인스턴스는 __proto__ 프로퍼티를 가지며 둘이 연결되어 있음

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
- p1부터 p5까지, 표현은 다르지만 모두 결국 Person 생성자 함수를 찾아내 new 연산을 수행함
- 결과적으로 5개의 Person 인스턴스가 만들어지고, forEach 루프는 이들이 모두 Person의 인스턴스가 맞다고(true) 출력함

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

```
// 실행 결과
Person { name: '사람1' } true
Person { name: '사람2' } true
Person { name: '사람3' } true
Person { name: '사람4' } true
Person { name: '사람5' } true
```

### Ex 6-6
- iu.getName = function... 코드가 실행되는 순간, iu 인스턴스 객체에 getName이라는 새로운 프로퍼티가 직접 생성됨
- 이후 iu.getName()을 호출하면, 자바스크립트 엔진은 프로토타입을 보기 전에 iu 객체 자신부터 뒤짐
- iu 인스턴스에 getName을 직접 할당했으므로, 호출 시 프로토타입까지 가지 않고 인스턴스의 메서드를 바로 실행함



```
// 예제 6-6 메서드 오버라이드
var Person = function (name) {
    this.name = name;
};
Person.prototype.getName = function () {
    return this.name;
};

var iu = new Person('지금');
iu.getName = function () {
    return '바로 ' + this.name;
};
console.log(iu.getName());
```

- console.log(iu.getName())는 프로토타입의 것이 아닌, 인스턴스에 새로 정의된 함수를 실행하여 '바로 지금'을 출력함

```
// 실행 결과
바로 지금
```

### Ex 6-7
- 코드 오류 발생
- arr.hasOwnProperty(2)를 실행하면, arr에서 찾음 -> 없음 -> arr.__proto__에서 찾음 -> 없음 -> arr.__proto__.__proto__(Object.prototype)에서 찾아서 실행함, 이게 프로토타입 체인 탐색 과정임

```
// 예제 6-7 배열에서 배열 메서드 및 객체 메서드 실행
var arr = [1, 2];
arr(.__proto__).push(3);
arr(.__proto__)(__proto__).hasOwnProperty(2);
```

### Ex 6-8
- 첫 arr.toString()은 Array.prototype의 것을 찾아 실행함
- arr.toString = function... 으로 arr 객체에 직접 메서드를 달아줌
- 두 번째 arr.toString()은 arr 객체에서 바로 메서드를 찾아 실행함
- 실행 : 처음에는 Array.prototype.toString()을, 나중에는 arr 객체에 직접 할당한 toString()을 실행함

```
// 예제 6-8 메서드 오버라이드와 프로토타입 체이닝
var arr = [1, 2];
Array.prototype.toString.call(arr);
Object.prototype.toString.call(arr);
arr.toString(); // 1,2

arr.toString = function () {
    return this.join('_');
};
arr.toString(); // 1_2
```

- 첫 번째 arr.toString()은 '1,2'를 반환하고, 재정의 후 두 번째 arr.toString()은 '1_2'를 반환함

```
// 실행 결과 (console 추가)
1,2
1_2
```


### Ex 6-9
- Object.prototype.getEntries가 정의되면, 배열, 숫자, 문자열 등 모든 데이터 타입이 이 메서드를 상속받음
- data.forEach 루프 안에서 datum[1].getEntries()가 호출되면, 각 데이터는 자신의 프로토타입 체인 최상단에 있는 getEntries를 찾아 실행함
- 모든 객체가 상속받는 Object.prototype에 getEntries를 추가했으므로, 배열, 숫자, 문자열 등 모든 데이터가 이 메서드를 호출할 수 있음

```
// 예제 6-9 Object.prototype에 추가한 메서드에의 접근
Object.prototype.getEntries = function() {
    var res = [];
    for (var prop in this) {
        if (this.hasOwnProperty(prop)) {
            res.push([prop, this[prop]]);
        }
    }
    return res;
};
var data = [
    ['object', { a: 1, b: 2, c: 3 }],
    ['number', 345],
    ['string', 'abc'],
    ['boolean', false],
    ['func', function() {}],
    ['array', [1, 2, 3]]
];

data.forEach(function (datum) {
    console.log(datum[1].getEntries());
});

```

- data 배열의 각 요소에 대해 getEntries가 실행된 결과가 출력됨
    - 객체는 [ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] ]
    - 배열은 [ [ '0', 'a' ], [ '1', 'b' ], [ '2', 'c' ] ]
    - 문자열은 [ [ '0', 1 ], [ '1', 2 ], [ '2', 3 ] ] 와 같이 출력됨

```
// 실행 결과
[ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] ]
[]
[ [ '0', 'a' ], [ '1', 'b' ], [ '2', 'c' ] ]
[]
[]
[ [ '0', 1 ], [ '1', 2 ], [ '2', 3 ] ]
```

### Ex 6-10
- Grade는 배열처럼 보일 뿐, Array.prototype을 상속하지 않아 pop 메서드가 없음
- prototype이 연결되지 않으면 pop 같은 배열 메서드를 쓸 수 없음
- prototype에 배열 인스턴스([])를 할당하는 건 잘못된 방법임

```
// 예제 6-10 Grade 생성자 함수와 인스턴스
var Grade = function () {
    var args = Array.prototype.slice.call(arguments);
    for (var i = 0; i < args.length; i++) {
        this[i] = args[i];
    }
    this.length = args.length;
};
var g = new Grade(100, 80);

console.log(g);

```

-  첫 console.log(g)는 Grade { '0': 100, '1': 80, length: 2 } 를 출력하지만, 다음 줄 g.pop()에서 에러가 발생하고 프로그램이 멈춤

```
// 실행 결과
Grade { '0': 100, '1': 80, length: 2 }

g.pop();
  ^

TypeError: g.pop is not a function
```


---
## Chapter 7
---
### Ex 7-1
- 생성자 함수에 직접 할당한 스태틱 메서드와 생성자의 prototype 객체에 할당한 프로토타입 메서드의 차이점을 보여줌줌
- 인스턴스는 프로토타입 체인을 통해 프로토타입 메서드에는 접근할 수 있지만, 생성자 함수 자체의 프로퍼티인 스태틱 메서드에는 직접 접근할 수 없음


```
// 예제 7-1 스태틱 메서드, 프로토타입 메서드
var Rectangle = function (width, height) {
    this.width = width;
    this.height = height;
};

Rectangle.prototype.getArea = function () {
    return this.width * this.height;
};

Rectangle.isRectangle = function (instance) {
    return instance instanceof Rectangle && 
        instance.width > 0 && instance.height > 0;
};

var rect1 = new Rectangle(3, 4);
console.log(rect1.getArea()); // 12 (O)
console.log(Rectangle.isRectangle(rect1)); // true
console.log(rect1.isRectangle(rect1)); // Error (X)
```

- rect1.getArea(): rect1 인스턴스는 자신의 __proto__가 가리키는 Rectangle.prototype에 정의된 getArea 메서드를 호출할 수 있으므로 정상 실행됨
- Rectangle.isRectangle(rect1): 스태틱 메서드는 생성자 함수를 통해 직접 호출해야 하므로 정상 실행됨
-  rect1.isRectangle(): isRectangle은 Rectangle 생성자 함수에 직접 할당된 스태틱 메서드임. rect1 인스턴스나 그 프로토타입 체인에는 존재하지 않으므로 에러가 발생함

```
// 실행 결과
12
true

console.log(rect1.isRectangle(rect1)); // Error (X)
                  ^
TypeError: rect1.isRectangle is not a function
```


### Ex 7-2
- 예제 6-10과 동일 


```
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
```

### Ex 7-3
- 생성자 함수의 prototype을 배열([])로 지정하여, 인스턴스가 배열처럼 동작하게 만드는 유사 배열 객체
- 특히 인스턴스가 가지는 length 프로퍼티와 배열 메서드(push)의 상호작용, 그리고 length 프로퍼티가 삭제됐을 때 발생하는 동작 변화를 보여줌

```
// 예제 7-3 length 프로퍼티를 삭제한 경우
... (Ex 7-2)
g.push(90);
console.log(g); // Grade { '0': 100, '1': 80, '2': 90, length: 3 }

delete g.length;
g.push(70);
console.log(g); // Grade { '0': 70, '1': 80, '2': 90, length: 1 }
```

- new Grade(100, 80)로 g 인스턴스 { '0': 100, '1': 80, length: 2 }가 생성됨. g의 __proto__는 빈 배열 []을 가리킴
- g.push(90): g는 __proto__를 통해 배열의 push 메서드를 사용함. push는 g의 length 값(2)을 참조하여 인덱스 2에 90을 추가하고, g.length를 3으로 업데이트함
- delete g.length: g 인스턴스가 직접 소유하던 length 프로퍼티가 삭제됨
- g.push(70): push 메서드가 g에서 length를 찾지만 없으므로, 프로토타입 체인을 따라 올라가 g.__proto__인 빈 배열의 length(값: 0)를 사용함. 따라서 인덱스 0에 70을 덮어쓰고, g에 length 프로퍼티를 1로 다시 생성함

```
// 실행 결과
Array { '0': 100, '1': 80, '2': 90, length: 3 }
Array { '0': 70, '1': 80, '2': 90, length: 1 }
```

### Ex 7-4
- 프로토타입 자체에 데이터가 포함된 배열을 할당했을 때 발생하는 문제
- delete로 인스턴스의 length 프로퍼티를 제거하면, 프로토타입이 가진 length를 기준으로 동작하게 되어 예측과 다른 결과가 나타날 수 있음

```
// 예제 7-4 요소를 추가하는 배열을 프로토타입 체인에 포함하는 해결 방법
var Grade = function () {
    var args = Array.prototype.slice.call(arguments);
    for (var i = 0; i < args.length; i++) {
        this[i] = args[i];
    }
    this.length = args.length;
};


Grade.prototype = ['a','b','c','d'];
var g = new Grade(100, 80);

g.push(90);
console.log(g); 

delete g.length;
g.push(70);
console.log(g);
```

- Grade.prototype이 ['a','b','c','d']이므로 length는 4임
- g.push(90)까지는 예제 7-3과 동일하게 동작하여 g는 { '0': 100, '1': 80, '2': 90, length: 3 }이 됨
- delete g.length: g의 length 프로퍼티가 삭제됨
- g.push(70): push가 g의 length를 찾지 못하고 __proto__의 length인 4를 참조함. 따라서 인덱스 4에 70을 추가하고 g.length를 5로 설정함

```
// 실행 결과
Array { '0': 100, '1': 80, '2': 90, length: 3 }
Array { '0': 100, '1': 80, '2': 90, '4': 70, length: 5 }
```


### Ex 7-5
- Rectangle과 Square라는 두 개의 독립된 클래스를 정의
- 두 클래스 모두 넓이를 구하는 getArea 메서드를 가지고 있지만, 각자 구현되어 있어 코드 중복이 발생하고 있음을 보여줌
- 이는 클래스 상속의 필요성 강조

구동 방식
Rectangle과 Square는 완전히 별개의 생성자 함수와 프로토타입을 가짐. 따라서 rect와 sq 인스턴스는 각각 자신의 프로토타입에 있는 getArea 메서드를 호출하여 넓이를 정상적으로 계산함

```
// 예제 7-5 Rectangle, Square 클래스
var Rectangle = function (width, height) {
    this.width = width;
    this.height = height;
};
Rectangle.prototype.getArea = function () {
    return this.width * this.height;
};
var rect = new Rectangle(3, 4);
console.log(rect.getArea()); // 12

var Square = function (width) {
    this.width = width;
};
Square.prototype.getArea = function () {
    return this.width * this.width;
};
var sq = new Square(5);
console.log(sq.getArea()); // 25
```

```
// 실행 결과
12
25
```

### Ex 7-6
- Square 클래스를 Rectangle 클래스와 더 유사한 구조를 갖도록 변경
- 이는 Square가 Rectangle의 기능을 상속받을 수 있도록 구조적 기반 마련

```
// 예제 7-6 Square 클래스 변경
...(Ex 7-5)
var Square = function (width) {
	this.width = width;
		this.height = width;
};

Square.prototype.getArea = function () {
	return this.width * this.height
};
...
```


### Ex 7-7
- 자바스크립트에서 프로토타입 체인을 이용한 가장 기본적인 클래스 상속 방법
- call 메서드로 부모의 프로퍼티를, new 키워드로 부모의 인스턴스를 만들어 프로토타입 메서드를 상속받는 구조

```
// Rectangle을 상속하는 Square 클래스
...
var Square = function (width) {
	Rectangle.call(this, width, width);
};
Square.prototype = new Rectangle();
...
```

### Ex 7-8
- 프로퍼티 제거: new SuperClass()로 프로토타입을 연결한 뒤, for문으로 불필요한 프로퍼티를 일일이 delete하는 비효율적인 방식임

```
// 예제 7-8 클래스 상속 및 추상화 방법(1) - 인스턴스 생성 후 프로퍼티 제거
var extendClass1 = function (SuperClass, SubClass, subMethods) {
    SubClass.prototype = new SuperClass();
    for (var prop in SubClass.prototype) {
        if (SubClass.prototype.hasOwnProperty(prop)) {
            delete SubClass.prototype[prop];
        }
    }
    if (subMethods) {
        for (var method in subMethods) {
            SubClass.prototype[method] = subMethods[method];
        }
    }
    Object.freeze(SubClass.prototype);
    return SubClass;
};

var Square = extendClass1(Rectangle, function (width) {
    Rectangle.call(this,width,width);
});
```


### Ex 7-9
- 중간에 내용이 없는 Bridge 함수를 정의
- Bridge.prototype에 SuperClass.prototype을 연결하고 new Bridge()를 자식의 프로토타입으로 삼아, 부모의 프로퍼티 상속 없이 프로토타입 체인만 연결

```
// 예제 7-9 클래스 상속 및 추상화 방법(2) - 빈 함수를 활용
var extendClass2 = (function () {
    var Bridge = function () {};
    return function (SuperClass, SubClass, subMethods) {
        Bridge.prototype = SuperClass.prototype;
        SubClass.prototype = new Bridge();
        if (subMethods) {
            for (var method in subMethods) {
                SubClass.prototype[method] = subMethods[method];
            }
        }
        Object.freeze(SubClass.prototype);
        return SubClass;
	};
})();
```

### Ex 7-10
- Object.create 활용: ES5에 도입된 Object.create()를 사용하여 지정된 프로토타입을 갖는 새로운 객체를 만듦
- Object.create(Rectangle.prototype)는 Rectangle.prototype을 __proto__로 하는 빈 객체를 생성해주므로, 가장 간결하고 효율적으로 프로토타입 체인을 연결

```
// 예제 7-10 클래스 상속 및 추상화 방법(3) - Object.create 활용
...
Square.prototype = Object.create(Rectangle.prototype);
Object.freeze(Square.prototype);
...
```


### Ex 7-11
- 부모 클래스의 인스턴스를 생성하여 프로토타입으로 삼은 뒤, 불필요한 부모의 인스턴스 프로퍼티를 for, delete로 제거하는 방식의 완성본
- 프로토타입 체인을 연결할 수는 있지만, 인스턴스를 만들었다가 삭제하는 과정 때문에 비효율적인 방법임임

```
// 예제 7-11 클래스 상속 및 추상화 방법 - 완성본(1) - 인스턴스 생성 후 프로퍼티 제거
var extendClass1 = function (SuperClass, SubClass, subMethods) {
    SubClass.prototype = new SuperClass();
    for (var prop in SubClass.prototype) {
        if (SubClass.prototype.hasOwnProperty(prop)) {
            delete SubClass.prototype[prop];
        }
    }
    
    SubClass.prototype.constructor = SubClass;
    if (subMethods) {
        for (var method in subMethods) {
            SubClass.prototype[method] = subMethods[method];
        }
    }
    Object.freeze(SubClass.prototype);
    return SubClass;
};
```

### Ex 7-12
- Bridge를 두어 부모의 불필요한 프로퍼티 상속 없이 프로토타입 체인만 순수하게 연결하는 방식
- Bridge.prototype = SuperClass.prototype: 빈 함수의 프로토타입에 부모 클래스의 프로토타입을 연결함
- SubClass.prototype = new Bridge(): 이 Bridge 함수의 인스턴스를 자식의 프로토타입으로 삼음
- 결과적으로 자식 프로토타입은 부모 프로토타입을 __proto__로 가리키는, 아무런 프로퍼티도 없는 깨끗한 객체가 됨
- SubClass.prototype.constructor = SubClass: constructor 연결을 복구함

```
// 예제 7-12 클래스 상속 및 추상화 방법 - 완성본(2) - 빈 함수를 활용
var extendClass2 = (function () {
    var Bridge = function () {};
    return function (SuperClass, SubClass, subMethods) {
        Bridge.prototype = SuperClass.prototype;
        SubClass.prototype = new Bridge();
        SubClass.prototype.constructor = SubClass;
        if (subMethods) {
            for (var method in subMethods) {
                SubClass.prototype[method] = subMethods[method];
            }
        }
        Object.freeze(SubClass.prototype);
        return SubClass;
    };
})();
```

### Ex 7-13
- ES5의 Object.create()를 사용하여 프로토타입 체인을 연결하는 가장 효율적인 방법의 완성본임
- 코드가 간결하고 의도가 명확하게 드러나는 것이 장점임

```
// 예제 7-13 클래스 상속 및 추상화 방법 - 완성본(3) - Object.create 활용
var extendClass3 = function (SuperClass, SubClass, subMethods) {
    SubClass.prototype = Object.create(SuperClass.prototype);
    SubClass.prototype.constructor = SubClass;
    if (subMethods) {
        for (var method in subMethods) {
            SubClass.prototype[method] = subMethods[method];
        }
    }
    Object.freeze(SubClass.prototype);
    return SubClass;
};
```

### Ex 7-14
- ES6 이전에 상속 관계에서 부모 클래스의 메서드나 생성자를 호출하는 super 기능을 수동으로 구현
- SubClass.prototype.super 라는 메서드를 추가함
- 생성자 호출: this.super(width, width)처럼 인스턴스의 생성자에서 super()를 호출하면, 부모 생성자인 SuperClass.apply(self, arguments)가 실행되어 부모의 프로퍼티를 상속함
- 메서드 호출: this.super('getArea')()처럼 메서드명을 인자로 주면, 부모 프로토타입(SuperClass.prototype)에서 해당 메서드를 찾아 현재 인스턴스의 this로 실행해주는 함수를 반환함
- 이를 통해 자식 메서드 안에서 부모 메서드를 호출할 수 있음

```
// 예제 7-14 하위 클래스에 super 메서드 추가
var extendClass = function (SuperClass, SubClass, subMethods) {
    SubClass.prototype = Object.create(SuperClass.prototype);
    SubClass.prototype.constructor = SubClass;
    SubClass.prototype.super = function (propName) { // super 기능 구현
    var self = this;
    if (!propName) return function () {
        SuperClass.apply(self, arguments);
    }
    var prop = SuperClass.prototype[propName];
    if (typeof prop !== 'function') return prop;
    return function () {
        return prop.apply(self, arguments);
    }
    };
    if (subMethods) {
    for (var method in subMethods) {
        SubClass.prototype[method] = subMethods[method];
    }
    }
    Object.freeze(SubClass.prototype);
    return SubClass;
};

var Rectangle = function (width, height) {
    this.width = width;
    this.height = height;
};
Rectangle.prototype.getArea = function () {
  return this.width * this.height;
};
var Square = extendClass(
    Rectangle,
    function (width) {
        this.super(width, width); // super 사용 (1)
    }, {
    getArea: function () {
      console.log('size is: ', this.super('getArea')()); // super 사용 (2)
        }
    }       
);
var sq = new Square(10);
sq.getArea(); // size is:  100
console.log(sq.super('getArea')()); // 100
```

```
// 실행 결과
size is:  NaN
NaN
```


### Ex 7-15
- ES5 시절의 생성자 함수와 프로토타입을 이용한 방식과 ES6의 class 키워드를 이용한 방식을 나란히 비교하여, ES6 클래스 문법이 얼마나 더 간결하고 직관적인지 보여줌
- ES5: 스태틱 메서드는 생성자 함수(ES5)에 직접 프로퍼티로 할당하고, 인스턴스 메서드는 prototype 객체(ES5.prototype)에 할당함
- ES6: class 선언부 안에 constructor, static 메서드, 일반 메서드를 보기 좋게 정의함. 내부적으로는 ES5 방식과 동일하게 프로토타입 기반으로 동작하지만, 문법적으로 훨씬 깔끔하게 클래스를 표현할 수 있음

```
// 예제 7-15 ES5와 ES6의 클래스 문법 비교
var ES5 = function (name) {
    this.name = name;
};
ES5.staticMethod = function () {
    return this.name + ' staticMethod';
};
ES5.prototype.method = function () {
    return this.name + ' method';
};
var es5Instance = new ES5('es5');
console.log(ES5.staticMethod());     // es5 staticMethod
console.log(es5Instance.method()); // es5 method

var ES6 = class {
    constructor (name) {
    this.name = name;
    }
    static staticMethod () {
    return this.name + ' staticMethod';
    }
    method () {
    return this.name + ' method';
    }
};
var es6Instance = new ES6('es6');
console.log(ES6.staticMethod());     // ES6 staticMethod
console.log(es6Instance.method()); // es6 method

// ES6의 클래스 상속
var Rectangle = class {
    constructor (width, height) {
    this.width = width;
    this.height = height;
    }
    getArea () {
    return this.width * this.height;
    }
};
var Square = class extends Rectangle {
    constructor (width) {
    super(width, width);
    }
    getArea () {
    console.log('size is: ', super.getArea());
    }
};
```

```
// 실행 결과
ES5 staticMethod
es5 method
ES6 staticMethod
es6 method
```
