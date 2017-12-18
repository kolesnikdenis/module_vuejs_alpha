const UserProfile = {
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
    },template: `<div>через....</div>`
}
const add_contact_to_db= {
    store: store,
    mounted: function () {
        this.$store.commit('updateData_page', { title: "", body: "", page_get: "add_contact_to_db" });
    },template: `<div></div>`
}
const books = {
    store: store,
    mounted: function () {
        if ( this.$route.params && this.$route.params.id ) {
            var send_obj={ title: "123", body: "123", page_get: "get_numbers_from_phonebook", books_id: this.$route.params.id };
            if ( this.$route.params.id !== "show" ) {
                this.$store.commit('updateData_page', send_obj);
                alert("вы хотите глянуть содержимое телефонной книги под id: "+this.$route.params.id);
            }else {
                alert("еще не придумал что тут выводить или кучу номеров если их добалвять масивом или еще и галлерею контакта добавить\r\n кстати вы смотрите контакт под номером:"+this.$route.params.action)
            }
        } else {
            alert("вы хотите глянуть книги ");
            this.$store.commit('updateData_page', {title: "", body: "", page_get: "phonebooks"});
        }
    },
    template: `<div> <router-view></router-view></div>`

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


const router = new VueRouter({
    routes:  [
        { path: '/contact', component: contact},
        { path: '/reg', component: reg },
        { path: '/login', component: UserProfile },
        { path: '/userinfo', component: userinfo },
        {
            path: '/books',  component:books,
            children: [{
                path: ':id',
                component:  books,
                children: [
                    { path: ':action', component: books  }
                    ,]
            }]
        },
        { path: '/logout', component: logout },
        { path: '/about', component: about},
        { path: '/createbooks', component: createbooks},
        { path: '/add_to_phone_book', component: add_contact_to_db,   },
        { path: '/auth', component: UserProfile, props:  ({ auth: false }),
            children: [ {
                path: ':user',
                component: UserProfile,
                children: [
                    { path: ':action', component: UserProfile  }
                    ,]
            },
            ]
        }
    ]
})