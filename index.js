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

    methods: {
        hello: function () {
            alert('hello ' + this.form1.name);
        },

        fetch: function () {

            console.log('fetch');

            var url = 'https://jsonplaceholder.typicode.com/todos/1';
            axios.get(url)
                .then(function(res){
                    console.log('data',res.data);
                })
                .catch(function(ex){
                   console.error(ex); 
                });
        }
    }
});
