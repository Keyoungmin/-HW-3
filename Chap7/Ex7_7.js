// Rectangle을 상속하는 Square 클래스
...
var Square = function (width) {
	Rectangle.call(this, width, width);
};
Square.prototype = new Rectangle();
...