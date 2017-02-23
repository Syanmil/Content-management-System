var app = new Vue({
  el: '#app',
  data: {
    message: '',
    authenticated: false,
    page: "landing",
    username: '',
    password: '',
    editLetter: '',
    editFrequency: '',
    searchLetterData: '',
    searchFrequencyData: '',
    letter: '',
    frequency: '',
    datas: [],
    dataDates: []
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
        sessionStorage.setItem('user', response.data.username)
        app.message = sessionStorage.getItem('user')
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
        if(response.data.username){
          app.page = 'login'
        }
      })
    },
    gotodata: function(){
      app.page = 'data'
      axios.get('http://localhost:3000/api/data')
      .then(function(response){
        let indexed = response.data.map(function(item, index){
          item.number = index + 1
          return item
        })
        app.datas = indexed
      })
    },
    gotodatadate: function(){
      app.page = 'dataDate'
    },
    gotohome: function(){
      app.page = 'home'
    },
    check: function(){
      app.message = sessionStorage.getItem('user')
      if(sessionStorage.getItem('token')){
        app.page = 'home'
        app.authenticated = true
      }
    },
    addData: function(){
      axios.post('http://localhost:3000/api/data', {
        letter : app.letter,
        frequency: app.frequency
      })
      .then(function(data){
        data.data.number = app.datas.length
        app.datas.push(data.data)
      })
    },
    modalEditData: function(id, letter, frequency){
      $('.ui.basic.modal')
      .modal('setting', {
        onApprove: function(){
          app.dataUpdated(id)
        }
      })
      .modal('show')
      app.editLetter = letter
      app.editFrequency = frequency
    },
    deleteData: function(id){
      axios.delete(`http://localhost:3000/api/data/${id}`)
      .then(function(){
        app.gotodata()
      })
    },
    dataUpdated: function(id){
      axios.put(`http://localhost:3000/api/data/${id}`, {
        letter : app.editLetter,
        frequency: app.editFrequency
      })
      .then(function(){
        app.gotodata()
      })
    },
    searchData: function(){
      axios.get(`http://localhost:3000/api/data/search?letter=${app.searchLetterData}&frequency=${app.searchFrequencyData}`)
      .then(function(response){
        console.log(response.data);
        app.datas = response.data
      })
    }
  }
})
app.check()
