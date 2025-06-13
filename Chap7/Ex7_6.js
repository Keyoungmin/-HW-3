
// 예제 7-6 Square 클래스 변경
...
var Square = function (width) {
	this.width = width;
		this.height = width;
};

Square.prototype.getArea = function () {
	return this.width * this.height
};
...