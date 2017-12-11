var todo = Vue.component('form-login', {
    props: ['todo'],
    template: `<li>form login</li>`,
    methods: {
        test: function (in_text){
            alert("клик на: "+in_text);
        },
        test2: function (in_text){
            alert("клик ссылочку: "+in_text);
        },
        change: function (newValue) {
            console.log(" methods change",newValue.target.value,newValue.target.id)
            console.log(app7.groceryList);
            app7.groceryList[newValue.target.id].text = newValue.target.value
        }
    },
})
