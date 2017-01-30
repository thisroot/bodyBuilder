define(['client/contactModel', 'hbs!client/contact/contact'], function(Contact, viewTemplate) {
	var $ = Dom7;

	function render(params) {
		$('.contact-page').html(viewTemplate({ model: params.model }));
		bindEvents(params.bindings);
	}

	function bindEvents(bindings) {
		for (var i in bindings) {
			$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
		}
	}

	return {
		render: render
	}
});
