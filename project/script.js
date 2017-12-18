
const myMainContent = ( 'main-content', {
    template: `<div>
  <nav class="navbar navbar-inverse navbar-static-top">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">Облоко контактов</a>
      </div>
      <div id="navbar" class="navbar-collapse collapse">
        <ul class="nav navbar-nav">
          <li class="active"><router-link to="/books">Телефонные книги</router-link></li>
          <li><router-link to="/about">О проекте</router-link></li>
          <li><router-link to="/contact">Контакы руководства</router-link></li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Авторизация<span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><router-link to="/login">Авторизация</router-link></li>
              <li><router-link to="/reg">Регистрация</router-link></li>
              <li role="separator" class="divider"></li>
              <li class="dropdown-header">инфа о пользователе:</li>
              <li><router-link to="/userinfo">Информация</router-link></li>
              <li><router-link to="/logout">Выход</router-link></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    <div class="container">
    <div class="jumbotron">
          <slot name="my_title"></slot>                
          <slot name="my_body"></slot>
          <slot name="my_some"></slot>
          
    </div>

</div>
  
  <router-view></router-view>
  </div>
  `
})
Vue.component('login-form', {
    store: store,
    data: function () {
        return {
            out: { login: "", password: "", check: false},
            message: '',
            error:' ',
            image:''
        }
    },
    template: `<form class="form-signin">
            {{error}}<br>{{message}} 
        <div v-if="!status_login">
        <h2 class="form-signin-heading">Авторизация на сайте:</h2>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email"  v-model="out.login" id="inputEmail" class="form-control" placeholder="Имя пользователя" required="" autofocus="">
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" v-model="out.password"  class="form-control" placeholder="Пароль" required="">
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="out.check"  value="remember-me"> Помни меня <small><small>( не забывай )</small></small>
          </label>
          <label>{{out}}</label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" @click=check type="submit">Вход</button>
        </div>
        <div v-if="status_login"> вы уже авторизированы </div>
      </form>`,
    methods: {
        check: function (e) {
            var url="https://kolesnikdenis.com/a-level/modulevue/sql.php";
            var send_post={task: 'login', job: this.out};
            this.$http.post(url, send_post, {emulateJSON:true}).then(function(callback){
                this.error = callback.body.error;
                this.message  = callback.body.msg;
                var sql = JSON.parse(callback.body.sql);
                if (sql) {
                    this.out.id = sql[0].id;
                    this.$store.commit('login_status', {status: callback.body.msg1, login: this.out.login, password: this.out.password, parent_id: sql[0].id });
                }

            });
        },
    },
    computed: {
        status_login: { get(){ return this.$store.state.status_login } },
    }
})
/*Vue.component('create-book', {
    data: function () {
        return {
            out: { phonebook: "", description: [], pathfile: "", base64: ""},
            image: '',
        }
    },
    template: `<div class="form-group has-success">
  <label class="form-control-label" for="inputSuccess1">Веди название телефонной книги:</label>
  <input type="text" v-model=out.phonebook class="form-control form-control-success" id="inputSuccess1">
  <!--<div class="form-control-feedback">Success! You've done it.</div>-->
  <small class="form-text text-muted">Придумай название типа: "однокурсники", "Сотрудники",  "Миньоны" </small>
<!--
</div>
<div class="form-group has-success">
-->
  <label class="form-control-label" for="inputSuccess1">Описание:</label>
  <input type="text" v-model=out.description  class="form-control form-control-success" id="inputSuccess1">
  <!--<div class="form-control-feedback">Success! You've done it.</div>-->
  <small class="form-text text-muted">Если у тебя есть мнение про этих людей можишь написать небольшое описание...</small>
<!--</div>-->
<br>

<label v-if="!image"label class="btn btn-default btn-file">
    Browse <input type="file"  @change="onFileChange" style="display: none;">
</label>

<label v-if="image">
    <img width=100px :src="image" />
    <button @click="removeImage">Remove image</button>
</label>
<button class="btn btn-lg btn-primary btn-block" @click=check type="submit">добвить телефонный справочник</button><br>
<br>{{out}} {{t}}
</div>`,
    methods: {
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            console.log(files[0]);
            this.out.pathfile = files[0].name;
            if (!files.length)
                return;
            this.createImage(files[0]);

        },
        createImage(file) {
            var image = new Image();
            var reader = new FileReader();
            var vm = this;
            reader.onload = (e) => {
                vm.image = e.target.result;
                this.out.base64=reader.result;
            };
            reader.readAsDataURL(file);

        },
        removeImage: function (e) {
            this.image = '';
            this.out.base64="";
            this.out.pathfile="";
        },
        check: function (e) {
            alert(this.out);
            console.log(this.out);
        },
    }
})*/
Vue.component('registration-form', {
    data: function () {
        return {
            out: { login: "", password: "", name:"", lastname:"", check: false, base64: ""},
            image: '',
            error: "",
            message: ""
        }
    },
    template: `
        <form style="width: 50%" class="form-signin">
        {{error}} <br>  {{message}}
        <div v-if=!status_login>
        <h2 class="form-signin-heading">Регистрация на сайте:</h2>
        
        <label for="inputEmail" class="sr-only">Email или Логин</label>
        <input type="email"  v-model="out.login" id="inputEmail" class="form-control" placeholder="логин \ e-mail" required="" autofocus="">
        
        <label for="inputName" class="sr-only">Имя</label>
        <input type="text"  v-model="out.name" id="inputName" class="form-control" placeholder="Имя" required="" autofocus="">
        
        <label for="inputLastName" class="sr-only">Фамилия</label>
        <input type="text"  v-model="out.lastname" id="inputLastName" class="form-control" placeholder="Фамиоия" required="" autofocus="">
        
        <label for="inputPassword" class="sr-only">Пароль</label>
        <input type="password"  v-model="out.password" id="inputPassword"  class="form-control" placeholder="Пароль" required="" autofocus="">
                
        <label for="inputConfPassword" class="sr-only">Подтверждения пароля</label>
        <input type="password" v-model="out.password" id="inputConfPassword" class="form-control" placeholder="Подтверждения пароля" required="">
        
        <label v-if="!image"label class="btn btn-default btn-file">
            Выбери свое фото ;) <input type="file"  @change="onFileChange" style="display: none;">
        </label>
        <label v-if="image">
            <img width=100px :src="image" />
        <button  class="btn btn-default" @click="removeImage">Сменить фото</button>
        </label>
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="out.check"  value="remember-me"> Помни меня <small><small>( не забывай )</small></small>
          </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" @click=check type="submit">Вход</button>
        </div>
        <div v-if="status_login">
            <div v-if="!message">
                вы уже авторизированы 
            </div>
        </div>
      </form>
`,
    methods: {
        check: function (e) {
                var url="https://kolesnikdenis.com/a-level/modulevue/sql.php";
                var send_post={task: 'reg', job: this.out};
                this.$http.post(url, send_post, {emulateJSON:true}).then(function(callback){
                    console.log(callback);
                    this.error = callback.body.msg1;
                    this.message  = callback.body.msg1 +callback.body.msg
                    alert(this.message);
                });
        },
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            this.out.pathfile = files[0].name;
            if (!files.length)
                return;
            this.createImage(files[0]);
        },
        createImage(file) {
            var image = new Image();
            var reader = new FileReader();
            var vm = this;
            reader.onload = (e) => {
                vm.image = e.target.result;
                this.out.base64=reader.result;
            };
            reader.readAsDataURL(file);
        },
        removeImage: function (e) {
            this.image = '';
            this.out.base64="";
            this.out.pathfile="";
        },
    },
    computed: {
        status_login: { get(){ return this.$store.state.status_login } },
    }
})
Vue.component('user-info', {
    store: store,
    data: function () {
        return {
            out: {
                id: "",
                login: "",
                name: "",
                datetime: "",
                lastname: "",
                password: "",
                pathfile: "",
                base64: "",
            },
            image: '',
            message:'',
            error:'',
        }
    },
    template: ` <form  class="form-signin">
        <div v-if=status_login>
        <h2 class="form-signin-heading">редактировать профиль пользователя:</h2>
        {{message}} {{error}}
        <label for="inputDatetime">Время и дада регистрации абонента:</label>
        <p id="inputDatetime" class="form-control" placeholder="datetime">{{out.datetime}}</p>
        
        <label for="inputId" >ID:</label>
        <p id="inputId" class="form-control" placeholder="ID">{{out.id}}</p>
        
        
        <label for="inputEmail" class="sr-only">Email или Логин</label>
        <input type="email"  v-model="out.login" id="inputEmail" class="form-control" placeholder="логин \ e-mail" required="" autofocus="">
        
        <label for="inputName" class="sr-only">Имя</label>
        <input type="text"  v-model="out.name" id="inputName" class="form-control" placeholder="Имя" required="" autofocus="">
        
        <label for="inputLastName" class="sr-only">Фамилия</label>
        <input type="text"  v-model="out.lastname" id="inputLastName" class="form-control" placeholder="Фамиоия" required="" autofocus="">
        
        <label for="inputPassword" class="sr-only">Пароль</label>
        <input type="password"  v-model="out.password" id="inputPassword"  class="form-control" placeholder="Пароль" required="" autofocus="">
                
        <label for="inputConfPassword" class="sr-only">Подтверждения пароля</label>
        <input type="password" v-model="out.password" id="inputConfPassword" class="form-control" placeholder="Подтверждения пароля" required="">
        
        <label v-if="!image"label class="btn btn-default btn-file">
            Выбери свое фото ;) <input type="file"  @change="onFileChange" style="display: none;">
        </label>
        <label v-if="image">
            <img width=100px :src="image" />
        <button  class="btn btn-default" @click="removeImage">Сменить фото</button>
        </label>
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="out.check"  value="remember-me"> Помни меня <small><small>( не забывай )</small></small>
          </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" @click=updateinfo type="submit">Обновить информацию</button>
        </div>
        <div v-if="!status_login">
         <h3>Вы не авторизированы посему по этому Вам требуется регистрация \\ регистрация:</h3>
         <login-form></login-form>
         </div>
      </form>`,
    mounted: function () {
      var url="https://kolesnikdenis.com/a-level/modulevue/sql.php";
      var send_post={task: 'get_info_user', job: { login: this.login, password: this.password}};
      this.$http.post(url, send_post, {emulateJSON:true}).then(function(callback){
          var sql = JSON.parse(callback.body.sql);
          if (sql){
              this.out.id = sql[0].id;
              this.out.login = sql[0].login;
              this.out.datetime = sql[0].datetime;
              this.out.password = sql[0].password;
              this.out.name = sql[0].firstname;
              this.out.lastname = sql[0].lastname;
              this.image = sql[0].photo;
          }

              this.error = callback.body.msg1;
              this.message = callback.body.msg1 + callback.body.msg;

      });

    },
    methods: {

        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            console.log(files[0]);
            this.out.pathfile = files[0].name;
            if (!files.length)
                return;
            this.createImage(files[0]);
        },
        createImage(file) {
            var image = new Image();
            var reader = new FileReader();
            var vm = this;
            reader.onload = (e) => {
                vm.image = e.target.result;
                this.out.base64=reader.result;
            };
            reader.readAsDataURL(file);
        },
        removeImage: function (e) {
            this.image = '';
            this.out.base64="";
            this.out.pathfile="";
        },
        updateinfo: function (e) {
            var url="https://kolesnikdenis.com/a-level/modulevue/sql.php";
            var send_post={task: 'update_info', job: this.out};
            this.$http.post(url, send_post, {emulateJSON:true}).then(function(callback){
                console.log(callback);
                this.error = callback.body.msg1;
                this.message  = callback.body.msg1 +callback.body.msg
            });

        },

    },
    computed: {
        status_login: { get(){ return this.$store.state.status_login } },
        login: { get(){  return this.$store.state.login } },
        password: { get(){ return  this.$store.state.password } },
    }
});
Vue.component('logout-t', {
    store: store,
    data: function () {
        return {
            image: '',
            message:'',
            error:'',
        }
    },
    template: `
        <div>
 
         <h3>хнык... покааа....</h3>
           
         
 
         </div>
   `,
    mounted: function () {
        /*console.log("store:",this.$store.state.login );
         console.log("load data login:"+this.login+" password:"+this.password);*/
        var url="https://kolesnikdenis.com/a-level/modulevue/sql.php";
        var send_post={task: 'get_info_user', job: { login: this.login, password: this.password}};
        this.$http.post(url, send_post, {emulateJSON:true}).then(function(callback){
            var sql = JSON.parse(callback.body.sql);
            if (sql){
                this.out.id = sql[0].id;
                this.out.login = sql[0].login;
                this.out.datetime = sql[0].datetime;
                this.out.password = sql[0].password;
                this.out.name = sql[0].firstname;
                this.out.lastname = sql[0].lastname;
                this.image = sql[0].photo;
            }

            this.error = callback.body.msg1;
            this.message = callback.body.msg1 + callback.body.msg;

        });

    },
    methods: {

        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            console.log(files[0]);
            this.out.pathfile = files[0].name;
            if (!files.length)
                return;
            this.createImage(files[0]);
        },
        createImage(file) {
            var image = new Image();
            var reader = new FileReader();
            var vm = this;
            reader.onload = (e) => {
                vm.image = e.target.result;
                this.out.base64=reader.result;
            };
            reader.readAsDataURL(file);
        },
        removeImage: function (e) {
            this.image = '';
            this.out.base64="";
            this.out.pathfile="";
        },
        updateinfo: function (e) {
            var url="https://kolesnikdenis.com/a-level/modulevue/sql.php";
            var send_post={task: 'update_info', job: this.out};
            this.$http.post(url, send_post, {emulateJSON:true}).then(function(callback){
                console.log(callback);
                this.error = callback.body.msg1;
                this.message  = callback.body.msg1 +callback.body.msg
            });

        },

    },
    computed: {
        status_login: { get(){ return this.$store.state.status_login } },
        login: { get(){  return this.$store.state.login } },
        password: { get(){ return  this.$store.state.password } },
    }
});
Vue.component('create-book', {
    store: store,
    data: function () {
        return {
            out: {
                id: "",
                parent_id: "",
                name_db: "",
                datetime: "",
                base64: "",
                desc: "",
            },
            image: '',
            error:'',
            message:"",
        }
    },
    template: `<form  class="form-signin">
        <div v-if=status_login>
        <h2 class="form-signin-heading">Создать телефонную книгу:</h2>
        {{message}} {{error}}
        parent_id: {{parent_id}}
        <label for="inputName" class="sr-only">Название телефонной книги</label>
        <input type="text"  v-model="out.name_db" id="inputName" class="form-control" placeholder="Название телефонной книги" required="" autofocus="">
        
        <label for="inputDescr" class="sr-only">Описание</label>
        <input type="text"  v-model="out.desc" id="inputDescr" class="form-control" placeholder="Описание кто в этой телефонной книге( рабы, миньоны, сокурсники ... и т.д. )" required="" autofocus="">
        
        <label v-if="!image"label class="btn btn-default btn-file">
            выбери кавер для телефонной книги: <input type="file"  @change="onFileChange" style="display: none;">
        </label>
        <label v-if="image">
            <img width=100px :src="image" />
        <button  class="btn btn-default" @click="removeImage">Сменить картинку</button>
        </label>
        {{out}}
        <button class="btn btn-lg btn-primary btn-block" @click=createbook type="submit">Добавить</button>
        </div>
        <div v-if="!status_login">
         <h3>Вы не авторизированы посему по этому требуется авторизация \ регистрация:</h3>
         <login-form></login-form>
         </div>
      </form>`,
    methods: {

        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            console.log(files[0]);
            this.out.pathfile = files[0].name;
            if (!files.length)
                return;
            this.createImage(files[0]);
        },
        createImage(file) {
            var image = new Image();
            var reader = new FileReader();
            var vm = this;
            reader.onload = (e) => {
                vm.image = e.target.result;
                this.out.base64=reader.result;
            };
            reader.readAsDataURL(file);
        },
        removeImage: function (e) {
            this.image = '';
            this.out.base64 = "";
            this.out.pathfile = "";
        },
        createbook: function (e) {
            console.log("store:", this.$store.state.login);
            console.log("load data login:" + this.login + " password:" + this.password, +this.parent_id);

            var url = "https://kolesnikdenis.com/a-level/modulevue/sql.php";
            var send_post = {task: 'create_phone_book', job: this.out};
            this.$http.post(url, send_post, {emulateJSON: true}).then(function (callback) {


                if (callback.body.msg) {
                    alert(callback.body.msg +"\n"+ callback.body.msg1);
                }

                this.error = callback.body.msg1;
                this.message = callback.body.msg1 + callback.body.msg;
            });
        },
    },
    computed: {
        status_login: { get(){ return this.$store.state.status_login; } },
        login: { get(){ this.out.name = this.$store.state.name; return this.$store.state.login; } },
        parent_id: { get(){ this.out.parent_id =this.$store.state.parent_id; return this.$store.state.parent_id; } },
        password: { get(){ return  this.$store.state.password; } },
    }
})
Vue.component('phone-book', {
    store: store,
    data: function () {
        return {
            out: {
                id: "",
                parent_id: "",
                name_db: "",
                datetime: "",
                base64: "",
                desc: "",
            },
            gallery: [],
            image: '',
            error:'',
            message:"",
        }
    },
    template: `<div>
<div id="myCarousel" class="carousel slide" data-ride="carousel">

  <ol class="carousel-indicators">
    <li v-for="(item, key, index) in gallery"  :data-slide-to="key" data-target="#myCarousel"  v-bind:class="[key ? '':'active']" ></li>
  </ol>

  <div class="carousel-inner" style=" height: 400px;">
   <div  v-for="(ind, key, index) in gallery" v-bind:class="[key ? 'item':'item active']">
        <img style="width: 100%; height: 100%;" width=480px :src="ind.img" :alt="ind.name_db">
         <div class="carousel-caption">
        <h3>название телефонноф книги: {{ind.name_db}}</h3>
        <p>описание телефонной книги: {{ind.desc}}</p>
        <p>Дата создания: {{ind.datetime}}</p>
        <p><router-link :to="ind.link_to_db">открыть телефонную книгу</router-link></p>
         <p><router-link to="/contact">/contact</router-link></p>
      </div>
   </div>
  </div>
  <a class="left carousel-control" href="#myCarousel" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="right carousel-control" href="#myCarousel" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
</div>`,
    computed: {
        status_login: { get(){ return this.$store.state.status_login; } },
        parent_id: { get(){ this.out.parent_id =this.$store.state.parent_id; return this.$store.state.parent_id; } },
        password: { get(){ return  this.$store.state.password; } },
    },
    mounted: function () {
        var url="https://kolesnikdenis.com/a-level/modulevue/sql.php";
        var send_post={task: 'get_list_phone_book', job: { login: this.login, password: this.password, parent_id: this.parent_id}};
        this.$http.post(url, send_post, {emulateJSON:true}).then(function(callback){
            if (callback.body.sql) {
                var sql = JSON.parse(callback.body.sql);
                if (sql) {
                    for (key in sql) {
                        this.gallery.push({
                            link_to_db: "/books/" + sql[key].id,
                            name_db: sql[key].name,
                            datetime: sql[key].datetime,
                            img: sql[key].photo
                        });
                    }
                }

                this.error = callback.body.msg1;
                this.message = callback.body.msg1 + callback.body.msg;
            }
        });
    },
})

Vue.component('get_data_from_phonebook', {
    store: store,
    data: function () {
        return {
            phone_db: [],
            image: '',
            error:'',
            message:"",
            findd: "",
        }
    },
    template: `<div>
<div v-if=status_login>
<router-link class="btn btn-primary" to="/add_to_phone_book">добавить контакт в телефонную книгу</router-link>
<div v-if=error>

{{message}}<br>
{{error}} 
</div>
<div v-if=!error>

<div style="display: flex; justify-content:  stretch;"><p>поиск:</p><input type="text"  @input="find_name" v-model=findd class="form-control" id="pwd"></div>
<div id="myCarousel" class="carousel slide" data-ride="carousel">

  <ol class="carousel-indicators">
    <li v-for="(item, key, index) in phone_db"  :data-slide-to="key" data-target="#myCarousel"  v-bind:class="[key ? '':'active']" ></li>
  </ol>

  <div class="carousel-inner" style=" height: 400px;">
   <div  v-for="(ind, key, index) in phone_db" v-bind:class="[key ? 'item':'item active']">
        <img  style="width: 100%; height: 100%; background: #b98181; filter: blur(5px); "     @error=imageLoadError width=480px :src="ind.img" :alt="ind.name">
        
        <div class="carousel-caption">
        <div style="background: #9933334d; border-radius: 30px;">
        <h3>Имя {{ind.name}}</h3>
        <p>Телефон: {{ind.phone}}</p>
        <p>Дата создания: {{ind.datetime}}</p>
        </div>
        
        <p><router-link :to="ind.link_to_db">открыть контакт</router-link></p>
      </div>
   </div>
  </div>
  <a class="left carousel-control" href="#myCarousel" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="right carousel-control" href="#myCarousel" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
</div>
</div>
<div v-if=!status_login>вы не авторизированны</div>
</div>
</div>`,
    methods: {
        imageLoadError (e) {
            console.log(e);
            e.target.src="https://grist.files.wordpress.com/2015/11/blah-blah-c-shutterstock.jpg";
        },
        find_name  ({ type, target }) {
            if (target.value.length >2 ) {
                var url = "https://kolesnikdenis.com/a-level/modulevue/sql.php";
                send_json = {parent_id: this.parent_id, phone_book_id: this.books_id, find: target.value};
                this.phone_db.splice(0, this.phone_db.length);
                var send_post = {task: 'find_in_phone_book', job: send_json};
                this.$http.post(url, send_post, {emulateJSON: true}).then(function (callback) {
                    if (callback.body.sql) {
                        var sql = JSON.parse(callback.body.sql);
                        if (sql) {
                            for (key in sql) {
                                this.phone_db.push({
                                    link_to_db: "/books/show/" + sql[key].id,
                                    phone: sql[key].phone,
                                    id: sql[key].id,
                                    name: sql[key].name,
                                    datetime: sql[key].datetime,
                                    img: sql[key].photo
                                });
                            }
                        }

                    }
                    else {
                        this.error = callback.body.msg1;
                    }
                    this.message = callback.body.msg;
                });
            }
        },
    },
    computed: {

        status_login: { get(){ return this.$store.state.status_login; } },
        parent_id: { get(){ return this.$store.state.parent_id; } },
        books_id: { get(){ return  this.$store.state.books_id; } },
    },
    mounted: function () {
        var url="https://kolesnikdenis.com/a-level/modulevue/sql.php";
        send_json = { parent_id: this.parent_id, phone_book_id: this.books_id};
        var send_post={task: 'get_list_number_from_book', job: send_json};
        this.$http.post(url, send_post, {emulateJSON:true}).then(function(callback){
            if (callback.body.sql) {
                var sql = JSON.parse(callback.body.sql);
                if (sql) {
                    for (key in sql) {
                        this.phone_db.push({
                            link_to_db: "/books/show/" + sql[key].id,
                            phone: sql[key].phone,
                            id: sql[key].id,
                            name: sql[key].name,
                            datetime: sql[key].datetime,
                            img: sql[key].photo
                        });
                    }
                }

            }
            else {
                this.error = callback.body.msg1;
            }
            this.message = callback.body.msg;
        });
    },
})
Vue.component('add_contact_to_db', {
    store: store,
    data: function () {
        return {
            out: { name: "", num_phone: "", pathfile: "", base64: "" },
            image: '',
        }
    },
    computed: {
        status_login: { get(){ return this.$store.state.status_login; } },
        parent_id: { get(){ return this.$store.state.parent_id; } },
        books_id: { get(){ return  this.$store.state.books_id; } },
    },
    template: `<div class="form-group has-success">
  <input type="text" v-model=out.name class="form-control form-control-success" id="inputSuccess1">
  <input type="text" v-model=out.num_phone  class="form-control form-control-success" id="inputSuccess1">

<label v-if="!image"label class="btn btn-default btn-file">
    фото контакта: <input type="file"  @change="onFileChange" style="display: none;">
</label>

<label v-if="image">
    <img width=100px :src="image" />
    <button @click="removeImage">удалить фото</button>
</label>
<button class="btn btn-lg btn-primary btn-block" @click=add_to_book type="submit">Добавить контакт</button><br>
<br>{{out}}  
</div>`,
    methods: {
        add_to_book: function (e) {
            var url = "https://kolesnikdenis.com/a-level/modulevue/sql.php";
            this.out['books_id']=  this.books_id;
            this.out['parent_id']=  this.parent_id;
            var send_post = {task: 'add_to_phone_book', job: this.out};
            this.$http.post(url, send_post, {emulateJSON: true}).then(function (callback) {
                if (callback.body.msg) {
                    alert(callback.body.msg +"\n"+ callback.body.msg1);
                    this.$router.go(-1);
                }
                this.error = callback.body.msg1;
                this.message = callback.body.msg1 + callback.body.msg;
            });
        },
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            console.log(files[0]);
            this.out.pathfile = files[0].name;
            if (!files.length)
                return;
            this.createImage(files[0]);

        },
        createImage(file) {
            var image = new Image();
            var reader = new FileReader();
            var vm = this;
            reader.onload = (e) => {
                vm.image = e.target.result;
                this.out.base64=reader.result;
            };
            reader.readAsDataURL(file);

        },
        removeImage: function (e) {
            this.image = '';
            this.out.base64="";
            this.out.pathfile="";
        },
        check: function (e) {
            alert(this.out);
        },
    }
})
const my_component = ( 'my-component', {
    store: store,
    data: function () {
        return {
            my_body:  "<p>body</p>",
            some_1: "<p>some</p>",
        }
    },
    components: {
        'main-content': myMainContent
    },
    computed: {
        page_get: { get(){ return this.$store.state.content_web.page_get }},
        some: { get() { return  JSON.parse(this.$store.state.content_web.some); } },
        content: { get () { return this.$store.state.content_web.content } },
        title: { get () {  return this.$store.state.content_web.title } }
    },
    mounted: function () {

    },

    template: `
    <div>
      <main-content> 
        <h1 slot="my_title">{{title}} </h1>
        <div slot="my_body" v-html="content">   </div> 
        <div slot="my_some">
       <!--{{page_get}}-->
       
          <registration-form v-if="page_get=='reg'"></registration-form>
          <login-form v-if="page_get=='auth'"></login-form>
          <create-book v-if="page_get=='createbooks'"></create-book>
          <user-info v-if="page_get=='userinfo'"></user-info>
          <phone-book v-if="page_get=='phonebooks'"></phone-book>
          <logout-t v-if="page_get=='logout'"></logout-t>
          <get_data_from_phonebook  v-if="page_get=='get_numbers_from_phonebook'"></get_data_from_phonebook>
          <add_contact_to_db  v-if="page_get=='add_contact_to_db'"></add_contact_to_db>
        </div> 
      </main-content>
    </div>
`,
})

const app = new Vue({
     store: store,
     components: {
        'mycomponent': my_component,
     },
     router,


}).$mount('#app')

