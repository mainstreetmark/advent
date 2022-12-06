import fs from 'fs'

var map = [];
var count = 0;
var paths = [];

function IsBig(cave) {
	var char = cave.charAt(0)
	return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(char) >=0
}

function GetRoute(cave) {
 var outs = [];
 for (var m of map) {
	if (m.indexOf(cave) >= 0) {
		// m.splice(m.indexOf(cave),1)
		outs.push(m.filter(c => c !== cave)[0])
	}
 }
 return outs
}

function GetBest() {
	var count = {}
	for (var m of map){
		for (var c of m) {
			if (!IsBig(c) && c!=='start' && c!=='end') {
				count[c] = {cave: c, count: count[c] ? count[c].count + 1 : 1}
			}
		}
	}
	return Object.values(count).sort((a,b) => b.count-a.count)[0].cave
}

function GetSmallCaves() {
	var small = [];
	for (var m of map) {
		for (var c of m) {
			if (small.indexOf(c)===-1 && !IsBig(c) && c !== 'start' && c !== 'end')
				small.push(c);
		}
	}
	return small;
}

function Walk(cave, path,level,skip) {
	if (path.indexOf(cave)>=0 && !IsBig(cave)  && cave !== skip) return false;
	if (skip === cave && path.indexOf(cave)>=0) {
		// console.log("skipping", skip, path)
		skip ='XXXX'
	}
	path += ','+cave;
	var routes = GetRoute(cave);
	// console.log("walk>", cave, routes,path, GetRoute(cave))
	if (cave === 'end') {
		// console.log("PATH FOUND", path)
		paths.push(path);
		count++
		return false;
	}
	for (var r of routes) {
		// console.log(level, cave, ">",r, path, ">>>",skip)
		Walk(r, path, level+' ', skip)
	}
	return path;
}

fs.readFile('l.txt', 'utf8', (err, contents) => {
	var line
	var lines = contents.split('\n');
	while (line = lines.shift()) {
		map.push(line.split('-'))
	}
	console.log(map, GetBest());
	// console.log('routs',IsBig('a'),GetRoute('start'));

	console.log(GetSmallCaves())

	GetSmallCaves().map(c => Walk('start','','',c))
	console.log(count);

	// let unique = paths.filter((value, index) => {
    //     return paths.indexOf(value) == index;
    //   });

	let unique =  [...new Set(paths)] 
	console.log(count);

	console.log(unique.length);

})
