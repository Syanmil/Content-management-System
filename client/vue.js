var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello World',
    authenticated: false,
    page: "login",
    username: '',
    password: '',
    data: [],
    dataDate: []
  },
  methods: {
    login: function(){
      app.page = 'login'
    },
    logout: function(){
      app.page = 'landing'
    },
    register: function(){
      app.page = 'register'
    },
    signin: function(){
      console.log('sign');
      axios.post('http://localhost:3000/api/users/login', {
        username: app.username,
        password: app.password
      })
      .then(function(data){
        sessionStorage.setItem('token', data.token)
        if(data.token){
          app.page = 'home'
        }
      })
    },
    signup: function(){
      axios.post('http://localhost:3000/api/users/register', {
        username: app.username,
        password: app.password
      })
      .then(function(data) {

      })
    }
  }
})
