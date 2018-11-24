

d3.csv("tutorial_conposition.csv", function(dataset) {
	
	function gridData() {
	var data = new Array();
	

	var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
	var ypos = 1;
	var width = 50;
	var height = 50;
	var click = 0;
	// iterate for rows	
	//data.push(new Array());
	var temp = new Array();
for (var row = 1; row < Object.keys(dataset['0']).length; row++) {
	
	temp.push({
				x: xpos,
				y: 0,
				topic: Object.keys(dataset['0'])[row]
			})
	xpos = xpos+width;
//	temp.push(Object.keys(dataset['0'])[row]);
	}

	data.push(temp);
	console.log(data);
	xpos = 1;
	ypos = 50;
	console.log(data);
 	for (var column = 1; column < dataset.length; column++) {
 		data.push( new Array());
 	//	console.log("hi"+dataset[column]['filename']);
		data[column].push({
				x: 0,
				y: ypos,
				name: dataset[column]['filename']
			})
		ypos = ypos +height;
	}
	//for (var row = 2; row < Object.keys(dataset['0']).length; row++) {
	
	//}
	ypos = 50;
	xpos = 250;
	//ypos = ypos +height;
	console.log(data);
	for (var row = 1; row < dataset.length; row++) {
		//data.push( new Array() );
		// iterate for cells/columns inside rows
		for (var column = 1; column <= 20; column++) {
			data[row].push({
				x: xpos,
				y: ypos,
				val: dataset[row]['Topic'+(column+1)] 
			})
		//	txtfiles.push(dataset[row]['filename']);
			//console.log(data);
			// increment the x position. I.e. move it over by 50 (width variable)
			xpos += width;
		}
		// reset the x position after a row is complete
		xpos = 250;
		// increment the y position for the next row. Move it down 50 (height variable)
		ypos += height;	
	}
console.log(data);
return data;

}


	var margin = {top: 50, right: 30, bottom: 30, left: 50},
    	width = 800 - margin.left - margin.right,
    	height = 800 - margin.top - margin.bottom;


    var y = d3.scale.ordinal().rangeBands([0, height],0,1),
    	x = d3.scale.ordinal().rangeBands([0, width],0,1),
    	c = d3.scale.category20().domain(d3.range(36));


var gridData = gridData();	

// I like to log the data to the console for quick debugging

var txtfiles = new Array();
var topics = new Array();
	
//for (var row = 0; row < gridData.length; row++) {	
//	console.log(dataset[row]['filename']);
//	console.log(gridData[row]);
	//txtfiles.push(dataset[row]['filename']);	
//	}


var grid = d3.select("#grid")
	.append("svg")
	.attr("width","1200px")
	.attr("height","1200px");
	
var row = grid.selectAll(".row")
	.data(gridData)
	.enter().append("g")
	.attr("class", "row");
console.log(gridData);
row.append("text")
		.attr("class", "label")
		.attr("x",function(row,i) {  var temp =0;  return row[0].x;})
		.attr("y",function(row,i) {  var temp =0;  return row[0].y;})
		.attr("dy", ".32em")
		.text(function(d, i) { return d[0].name; });
console.log(gridData);
var column = row.selectAll(".circle")
	.data(function(d) {  return d; })
	.enter().append("circle")
	.attr("class","label")
	.attr("x",function(row,i) { if(row.topic) return row.x;})
	.attr("y",function(row,i) { if(row.topic)  return row.y;})
	.attr("dx", ".32em")
	.text(function(d, i) { console.log(d.topic); if(d.topic) return d.topic; })
	.attr("class","circle")
	.attr("cx", function (d,i) { if(!d.topic) return (d.x);})
	.attr("cy", function (d) { if(!d.topic) return (d.y);})
	.attr("r", function (d) { if(!d.name && !d.topic) return (d.val*10); else return 0; })
	.attr("width", function(d) { return d.width; })
	.attr("height", function(d) { return d.height; })
	.style("fill", "#fff")
	.style("stroke", "#222")
	.on('click', function(d) {
       d.click ++;
       if ((d.click)%4 == 0 ) { d3.select(this).style("fill","#fff"); }
	   if ((d.click)%4 == 1 ) { d3.select(this).style("fill","#2C93E8"); }
	   if ((d.click)%4 == 2 ) { d3.select(this).style("fill","#F56C4E"); }
	   if ((d.click)%4 == 3 ) { d3.select(this).style("fill","#838690"); }
    });
});