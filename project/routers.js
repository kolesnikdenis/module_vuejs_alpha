const UserProfile = {
    props:   ['query'],
    data: function () {
        return {

            todo: "reerere",
        }
    },
    store: store,

    mounted: function () {
            this.$store.commit('updateData_page', {
                title: "failed",
                body: "false...",
                page_get: "auth",
            });
    },

    template: `<form-login></form-login>`,
}
const reg = {
    template: ` <router-view></router-view>  `,
    mounted: function () {
        this.$store.commit('updateData_page', {
            title: "failed",
            body: "false...",
            page_get: "reg",
        });
    }
}
const Hello = {
    template: `
  <div>
  <h1 class="hello">Hello {{$attrs.query}}</h1>
    <h5 class="hello">attrs: {{ $attrs }}</h5>
  </div>
`
}
const userinfo = {
    store: store,
    mounted: function () {
        this.$store.commit('updateData_page', { title: "", body: "", page_get: "userinfo" });
    },
    template: `<div></div>`
}
const createbooks = {
    store: store,
    mounted: function () {
        this.$store.commit('updateData_page', { title: "", body: "", page_get: "createbooks" });
    },template: `<div></div>`
}
const about = {
    store: store,
    mounted: function () {
        this.$store.commit('updateData_page', { title: "", body: "", page_get: "about" });
    },template: `<div></div>`


}
const books = {
    store: store,
    props: {
        ['id']: {
            type: String,
            required: true,
            validator: function ( input_arr ) {
                console.log( input_arr );
                return true
            }
        }
    },
    mounted: function () {
        console.log(this.query);
        this.$store.commit('updateData_page', { title: "", body: "", page_get: "phonebooks" });
    },template: `<div><router-view></router-view></div>`
}


const logout = {
    store: store,
    props:   ['query'],
    mounted: function () {
            this.$store.commit('logout', { title: "", body: "", page_get: "logout" });
    }, template: `<div></div>`
}


const contact = {
    store: store,
    mounted: function () {
        this.$store.commit('updateData_page', { title: "", body: "", page_get: "contact" });
    },template: `<div></div>`


}
const UserPosts = {
    props: {
        ['user']: {
            type: String,
            required: true,
            validator: function ( input_arr ) {
                console.log( input_arr );
                return true
            }
        }
    },
    data: function () {
        return {
            indeximg:['lavel'],
            img_src: "reerere",
        }
    },
    methods: function(){ console.log("methods");},
    template: `<div>UserPosts: {{img_src}} -  {{indeximg}} {{user}} <br>
  <router-view></router-view>
  </div>`
};

const router = new VueRouter({
    routes:  [
        { path: '/contact', component: contact},
        { path: '/reg', component: reg },
        { path: '/login', component: UserProfile },
        { path: '/userinfo', component: userinfo },
        {
            path: '/books',  props:  ({ id: "Ирина:)"}), component: books,
            children: [{
                path: ':id',
                component: books,}]
        },
        { path: '/logout', component: logout },
        { path: '/about', component: about},
        { path: '/createbooks', component: createbooks},
        { path: '/auth', component: UserProfile, props:  ({ auth: false }),
            children: [ {
                path: ':user',
                component: UserProfile ,
                children: [
                    { path: ':action', component: UserProfile,
                        children: [ { path: 'dynamic', component: Hello,  props:  ({ query: "Ирина:)"}) },
                            { path: ':lavel', component: UserPosts, sidebar: "id",props:true },]}
                    ,]
            },
            ]
        }
    ]
})