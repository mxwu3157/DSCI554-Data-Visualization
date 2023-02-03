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

	const DEFAULT_FONT_SIZE = 12;
	const DEFAULT_TEXT_COLOR = 'black';
	const DEFAULT_FILL_COLOR = 'orange';

	function drawTextCentered(svg, text, x, y, fill, stroke, size) {
		var txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
		txt.setAttribute('style', 'text-anchor: middle; alignment-baseline: central;');
		txt.setAttribute('x', x);
		txt.setAttribute('y', y);
		txt.setAttribute('fill', 'black');
		txt.setAttribute('stroke', 'white');
		txt.setAttribute('stroke-width', 0.1);
		txt.setAttribute('font-size', `${size}px`);
		txt.innerHTML = text;
		svg.appendChild(txt);  //append to svg
	};

	function drawText(svg, string, x, y, fill='black', fontsize) {
		var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
		text.setAttribute('x', x);
		text.setAttribute('y', y);
		text.setAttribute('fill', fill);
		// text.setAttribute('stroke', 'black');
		// text.setAttribute('stroke-width', 1);
		text.setAttribute('font-size', `${fontsize}px`);
		text.innerHTML = string;
		svg.appendChild(text);  //append to svg
	  };

	function drawLine(svg, x1, y1, x2, y2, stroke='black', fill='black') {
		var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
		line.setAttribute('x1', x1);
		line.setAttribute('y1', y1);
		line.setAttribute('x2', x2);
		line.setAttribute('y2', y2);
		line.setAttribute('stroke', stroke);
		line.setAttribute('stroke-width', 1);
		svg.appendChild(line);  //append to svg
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
		},

		//create line (axis)
		axis: function (x1, y1, x2, y2, fill='black') {
			//draw circle
			drawLine(this.svg, x1, y1, x2, y2 ,fill = fill);


			return this;  //return this to allow chaining 🔗
		},

		text: function(string, x, y, fill = 'black', fontsize ){
			drawText(this.svg, string, x,y, fill, fontsize);
			return this;
		},

		legend:function(string, xc,yc, cfill,  r ='6px',tfill='black', fontsize='12px'){
			drawCircle(this.svg, xc,  yc, r, cfill);
			drawText(this.svg, string, xc+20,yc+5, tfill, fontsize = '12px');
			return this;	

		}
	};
	return api;
})();