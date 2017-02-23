var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello World',
    authenticated: false,
    page: "home",
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
      sessionStorage.clear();
      app.authenticated = false
      app.page = 'landing'
    },
    register: function(){
      app.page = 'register'
    },
    signin: function(){
      axios.post('http://localhost:3000/api/users/login', {
        username: app.username,
        password: app.password
      })
      .then(function(response){
        sessionStorage.setItem('token', response.data.token)
        if(response.data.token){
          app.page = 'home'
          app.authenticated = true
        }
      })
    },
    signup: function(){
      axios.post('http://localhost:3000/api/users/register', {
        username: app.username,
        password: app.password
      })
      .then(function(response) {
        console.log(response);
        if(response.data.username){
          app.page = 'login'
        }
      })
    }
  }
})
