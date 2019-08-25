'use strict';

new Vue({
	el: '#app',
	data: {
		message: '',

		form1: {
			meta: [],
			fields: [],
			record: {}
		}

	},

	mounted: async function () {
		let res = await axios.get('meta');
		this.form1.meta = parse_rec(res.data)[0];
		console.log(JSON.stringify(this.form1.meta));
	},

	methods: {

		fetch: async function () {

			let url = '/1/p';
			let res = await axios.get(url);
			let [record, fields] = parse_rec(res.data);
			this.form1.fields = fields;
			this.form1.record = record[0];
//			this.$forceUpdate();   // is this needed?  seems to work without it
			console.log(fields, record);
		},

		formStructure: function () {
			let st = [];

			let fields = this.form1.fields;
			let meta = this.form1.meta[0];
			let f_newline = false;

			for (let i = 0; i < fields.length; i++) {
				if (fields[i] === null) {
					f_newline = true;
					continue;
				}
				let f_name = fields[i];
				let f_type = meta[f_name];
				let f_value = this.form1.record[f_name] || null;

				// TODO move convert to loader?
				if (f_type === 'bit') {
					f_value = f_value === '1';
				}
				else if (f_type === 'num' || f_type === 'float') {
					f_value = +f_value;
				}

				st.push({
					name: f_name,
					type: f_type,
					value: f_value,
					readonly: false,
					newline: f_newline
				});
				f_newline = false;
			}

			this.form1.st = st;
			return this.form1.st;
		}

	}
});

function get_meta() {
}

function init() {
}
