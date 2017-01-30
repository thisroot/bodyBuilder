 require.config({
    paths: {
        handlebars: "public/lib/handlebars",
        text: "public/lib/text",
        hbs: "public/lib/hbs"
    },
    shim: {
        handlebars: {
            exports: "Handlebars"
        }
    }
});

define('app', ['client/router', 'client/utils'], function(Router, Utils) {
	Router.init();
	var f7 = new Framework7({
		modalTitle: 'Contacts7',
		swipePanel: 'left',
        animateNavBackIcon: true
	});

    var mySearchbar = f7.searchbar('.searchbar', {
    searchList: '.list-group',
    searchIn: '.item-tags'
    });

    var mainView = f7.addView('.view-main', {
        dynamicNavbar: true
    });
	return {
		f7: f7,
		mainView: mainView,
		router: Router,
		utils: Utils,
        searchbar: mySearchbar
	};
});
