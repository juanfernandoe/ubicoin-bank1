new Vue({
	el: '#app',
	data: {
		message: 'Hello Vue.js!',
		name: '',
		form1: {
			name: ''
		},
		form2: {
			name: ''
		}
	},

	mounted: function () {
		console.log("hello mounted");
		axios.get('meta').then(function(res) {
			this.meta = parse_rec(res.data)[0];
			console.log(this.meta);
		})
			.catch(function(ex){
				console.error(ex); 
			});
		},

		methods: {
			hello: function () {
				alert('hello ' + this.form1.name);
			},

			fetch: function () {

			console.log('fetch');

			var url = '/1/a';
			axios.get(url)
				.then(function(res){
			var [recs, fields] = parse_rec(res.data);
					console.log(fields, recs);
				})
				.catch(function(ex){
				   console.error(ex); 
				});
		}
	}
});

function get_meta() {
}

function init() {
}
