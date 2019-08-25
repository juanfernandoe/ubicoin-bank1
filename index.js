'use strict';

new Vue({
	el: '#app',
	data: {
		message: 'Hello Vue.js!',
		name: '',

		form1: {
			meta: [],
			fields: [],
			record: {}
		}

	},

	mounted: function () {
		axios.get('meta')
			.then((res) => {
				this.form1.meta = parse_rec(res.data)[0];
				console.log(JSON.stringify(this.form1.meta));
			})
			.catch((ex) => {
				console.error(ex);
			});
	},

	methods: {
		hello: function () {
			alert('hello ' + this.form1.name);
		},

		fetch: function () {

			var url = '/1/p';
			axios.get(url)
				.then((res) => {
					var [record, fields] = parse_rec(res.data);
					this.form1.fields = fields;
					this.form1.record = record[0];

					this.$forceUpdate();


					console.log(fields, record);
				})
				.catch((ex) => {
					console.error(ex);
				});
		},

		formStructure: function () {
			let st = [];

			var fields = this.form1.fields;
			var meta = this.form1.meta[0];

			for (var i = 0; i < fields.length; i++) {
				var f_name = fields[i];
				var f_type = meta[f_name];
				var f_value = this.form1.record[f_name] || null;

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
					readonly: true
				});
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
