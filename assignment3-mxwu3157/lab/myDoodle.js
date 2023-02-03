//myDoodle
var myDoodle = (function () {
	var svg;  //svg element to draw into

	function drawCircle(svg, cx, cy, r, fill) {
		var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
		circle.setAttribute('cx', cx);
		circle.setAttribute('cy', cy);
		circle.setAttribute('r', r);
		circle.setAttribute('fill', fill);
		svg.appendChild(circle);  //append to svg
	};

	const DEFAULT_FONT_SIZE = 14;
	const DEFAULT_TEXT_COLOR = 'white';
	const DEFAULT_FILL_COLOR = 'orange';

	function drawTextCentered(svg, text, x, y, fill, stroke, size) {
		var txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
		txt.setAttribute('style', 'text-anchor: middle; alignment-baseline: central;');
		txt.setAttribute('x', x);
		txt.setAttribute('y', y);
		txt.setAttribute('fill', fill);
		txt.setAttribute('stroke', stroke);
		txt.setAttribute('stroke-width', 1);
		txt.setAttribute('font-size', `${size}px`);
		txt.innerHTML = text;
		svg.appendChild(txt);  //append to svg
	};

	var api = {
		//select svg by id using ex2.7 code
		select: function (id) {
			this.svg = document.getElementById(id);
			return this;  //return this to allow chaining 🔗
		},


		//create bubble
		bubble: function (cx, cy, r, fill = DEFAULT_FILL_COLOR, label, labelColor = DEFAULT_TEXT_COLOR, labelSize = DEFAULT_FONT_SIZE) {
			//draw circle
			drawCircle(this.svg, cx, cy, r, fill);

			//draw bubble text
			if (label) {
				drawTextCentered(this.svg, label, cx, cy, labelColor, null, labelSize);
			}

			return this;  //return this to allow chaining 🔗
		}
	};
	return api;
})();