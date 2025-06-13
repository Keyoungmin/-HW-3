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

// 예제 7-6 Square 클래스 변경

var Square = function (width) {
	this.width = width;
		this.height = width;
};

Square.prototype.getArea = function () {
	return this.width * this.height
};
