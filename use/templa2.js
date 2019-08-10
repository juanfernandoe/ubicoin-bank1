var log = Function.prototype.bind.call(console.log, console);
function parse_rec(data) {
	var records = data.split('\n\n');
	var fields = [];
	var n = records.length;
	if (n && records[n-1] === '') {
		records.pop(); --n;
	}
	for (var i=0; i<n; ++i) {
		var lines = records[i].split('\n');
		records[i] = {};
		var m = lines.length;
		if (m && lines[m-1] === '') {
			lines.pop(); --m;
		}
		for (var j=0; j<m; ++j) {
			var rxm = lines[j].match(/^(.*?)\t(.*)$/);  // TODO check rx
			var k = rxm[1], v = rxm[2];
			records[i][k] = v;
			fields.push(k);
		}
	}
	return [records, fields];
}
function parse_tsv(data) {
	var records = data.split('\n');
	var n = records.length;
	if (n && records[n-1] === '') {
		records.pop(); --n;
	}
	var names = records.shift().split('\t'); --n;
	var w = names.length;
	for (var i=0; i<n; ++i) {
		var fields = records[i].split('\t');
		records[i] = {};
		for (var j=0; j<w; ++j) {
			var k = names[j];
			var v = fields[j];
			if (v === undefined) {
				v = '';
			}
			records[i][k] = v;
		}
	}
	return records;
}
