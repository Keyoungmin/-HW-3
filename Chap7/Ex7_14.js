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