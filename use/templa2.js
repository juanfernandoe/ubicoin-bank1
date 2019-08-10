var log = Function.prototype.bind.call(console.log, console);

function splitter(str, delim) {
	// TODO, max so can use to split a line?
	var ary = str.split(delim);
	var n = ary.length;
	if (n && ary[n-1] === '') {
		ary.pop(); --n;
	}
	return ary;
}

function parse_rec(data) {
	var records = splitter(data, '\n\n');
	var fields = [];
	for (var i=0; i<records.length; ++i) {
		var lines = splitter(records[i], '\n');
		var k, v;
		records[i] = {};
		for (var j=0; j<lines.length; ++j) {
			var kv = lines[j].match(/^(.*?)\t(.*)$/);  // TODO check rx
			if (kv[1]) {
				k = kv[1], v = kv[2];
				records[i][k] = v;
				fields.push(k);
			} else {
				v = kv[2];
				if (!records[i][k].match(/\n$/))
					records[i][k] += '\n';
				records[i][k] += v + '\n'
			}
		}
	}
	return [records, fields];
}

function parse_tsv(data) {
	var records = splitter(data, '\n');
	var names = splitter(records.shift(), '\t');
	for (var i=0; i<records.length; ++i) {
		var fields = records[i].split('\t');
		records[i] = {};
		for (var j=0; j<names.length; ++j) {
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
