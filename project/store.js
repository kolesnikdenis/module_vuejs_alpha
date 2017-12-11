const store = new Vuex.Store({
    strict: true,
    state: {
        content_web: {
            title: 'увы заголовок пуст',
            content: "увы конетент пуст",
            some: "content_web",
            page_get: "",
        },
        pages: {
            userinfo: {title:"Информация о пользователе", body: ""},
            auth:  {title:`Авторизация`, body: ``},
            reg:  {title:`Регистрация`, body: ``},
            about: { title: "О Компании", body: `<div class="container">

      <div class="masthead">
        <h3 class="text-muted">Индивидуальный телефонный справочинк:</h3>
      </div>

      <!-- Jumbotron -->
      <div class="jumbotron">
        <h1>Marketing stuff!</h1>
        <p class="lead">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet.</p>
        <p><a class="btn btn-lg btn-success" href="#" role="button">Get started today</a></p>
      </div>

      <!-- Example row of columns -->
      <div class="row">
        <div class="col-lg-4">
          <h2>Heading</h2>
          <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
          <p><a class="btn btn-primary" href="#" role="button">View details »</a></p>
        </div>
        <div class="col-lg-4">
          <h2>Heading</h2>
          <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
          <p><a class="btn btn-primary" href="#" role="button">View details »</a></p>
       </div>
        <div class="col-lg-4">
          <h2>Heading</h2>
          <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa.</p>
          <p><a class="btn btn-primary" href="#" role="button">View details »</a></p>
        </div>
      </div>

      <!-- Site footer -->
      <footer class="footer">
        <p>© Company 2017</p>
      </footer>

    </div>`},
            phonebooks: {title: "список ваших телефонных кинг:", body: `
                    <a href="#/createbooks" class="btn btn-primary"> ++ Создать телефонную книгу ++ </a><br>`},
            createbooks: {"title": "добавить телефонную книгу:", body: ``},
            contact: {"title": "Информация о нас:", body: ` <div class="site-wrapper-inner">

        <div class="cover-container">
 
          <main role="main" class="inner cover">
            <h3 class="cover-heading">...о великом ... о мне))</h3>
            <p class="lead">Я такой то и такой... <br>и звать меня так то...<br>и я что то умею .. <br></p>
            <p class="lead">
            
            
            
            <div id="myCarousel" class="carousel slide" data-ride="carousel">
  <!-- Indicators -->
  <ol class="carousel-indicators">
    <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
    <li data-target="#myCarousel" data-slide-to="1"></li>
    <li data-target="#myCarousel" data-slide-to="2"></li>
    <li data-target="#myCarousel" data-slide-to="3"></li>
    <li data-target="#myCarousel" data-slide-to="4"></li>
    <li data-target="#myCarousel" data-slide-to="5"></li>
    <li data-target="#myCarousel" data-slide-to="6"></li>
    <li data-target="#myCarousel" data-slide-to="7"></li>
    <li data-target="#myCarousel" data-slide-to="8"></li>
    <li data-target="#myCarousel" data-slide-to="9"></li>
    <li data-target="#myCarousel" data-slide-to="10"></li>
    <li data-target="#myCarousel" data-slide-to="11"></li>
    <li data-target="#myCarousel" data-slide-to="12"></li>
    
  </ol>

  <!-- Wrapper for slides -->
  <div class="carousel-inner" style="    height: 400px;">
    <div class="item active">
      <img style="
    width: 100%;
    height: 100%;
" src="1466695766198687223.jpg">
      <div class="carousel-caption">
        <h3>Los Angeles</h3>
        <p>LA is always so much fun!</p>
      </div>
    </div>

    <div class="item">
      <img style="
    width: 100%;
    height: 100%;
" src="1400835435_531193172.png">
      <div class="carousel-caption">
        <h3>Chicago</h3>
        <p>Thank you, Chicago!</p>
      </div>
    </div>

    <div class="item">
      <img style="
    width: 100%;
    height: 100%;
" src="14331430829994.jpg">
      <div class="carousel-caption">
        <h3>New York</h3>
        <p>We love the Big Apple!</p>
      </div>
    </div>
  


    <div class="item"> 
    <img style="
    width: 100%;
    height: 100%;
" src="govnokod_0_o.jpg">
      <div class="carousel-caption">
        <h3>Chicago</h3>
        <p>Thank you, Chicago!</p>
      </div>
    </div>

    <div class="item"> 
    <img style="
    width: 100%;
    height: 100%;
" src="Без названия.jpeg">
      <div class="carousel-caption">
        <h3>New York</h3>
        <p>We love the Big Apple!</p>
      </div>
    </div>
  
    <div class="item">
      <img style="
    width: 100%;
    height: 100%;
" src="1465571841117284256.jpg">
      <div class="carousel-caption">
        <h3>Chicago</h3>
        <p>Thank you, Chicago!</p>
      </div>
    </div>

    <div class="item">
     <img style="
    width: 100%;
    height: 100%;
" src="velosiped-iz-kostyley_0_o.jpg">
      <div class="carousel-caption">
        <h3>New York</h3>
        <p>We love the Big Apple!</p>
      </div>
    </div>

  
  
    <div class="item">
      <img style="
    width: 100%;
    height: 100%;
" src="432743.jpg">
      <div class="carousel-caption">
        <h3>Chicago</h3>
        <p>Thank you, Chicago!</p>
      </div>
    </div>

    <div class="item">
      <img style="
    width: 100%;
    height: 100%;
" src="images.jpeg">
      <div class="carousel-caption">
        <h3>New York</h3>
        <p>We love the Big Apple!</p>
      </div>
    </div>

  
    <div class="item">
      <img style="
    width: 100%;
    height: 100%;
" src="1400835435_531193172.png">
      <div class="carousel-caption">
        <h3>Chicago</h3>
        <p>Thank you, Chicago!</p>
      </div>
    </div>

    <div class="item">
      <img style="
    width: 100%;
    height: 100%;
" src="1473584307168771748.jpg">
      <div class="carousel-caption">
        <h3>New York</h3>
        <p>We love the Big Apple!</p>
      </div>
    </div>
  
  
  <div class="item">
       <img style="
    width: 100%;
    height: 100%;
" src="5688424.jpg">
      <div class="carousel-caption">
        <h3>Chicago</h3>
        <p>Thank you, Chicago!</p>
      </div>
    </div>
</div>

  <!-- Left and right controls -->
  <a class="left carousel-control" href="#myCarousel" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="right carousel-control" href="#myCarousel" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
            
              
          

          <footer class="mastfoot">
            <div class="inner">
              <p>вот по этому я не скажу кто я))) потому что мой код лично мне напоминает картинки выше ;)</p>
            </div>
          </footer>

        </div>

      </div>`},
        },
        status_login: false,
        login: "",
        password: "",
        parent_id:"",
    },

    mutations: {
        updateData: function ( state, { value } ) {
            this.state.content_web.title=value;
        },
        updateData_page: function ( state, { title, body, page_get, some } ) {
            var static_page = state.pages[page_get];
            this.state.content_web.page_get  = page_get;
            this.state.content_web.title=static_page.title;
            this.state.content_web.content=static_page.body;
            this.state.content_web.some=some;
        },
        login_status: function (state, { status, login, password,parent_id}) {
            this.state.status_login = status;
            this.state.login = login;
            this.state.password = password;
            this.state.parent_id = parent_id;
        },
        logout: function (state,{ title, body, page_get, some }) {
            console.log(page_get)
            this.state.content_web.page_get  = page_get;
            this.state.status_login = false;
            this.state.login = "";
            this.state.password = "";
            this.state.parent_id = "";
        }
    },
})
