define(['hbs!client/listb/building-list-item'], function(template) {
    var $ = Dom7;

	function render(params) {
        $('.buildings-list ul').html(template(params.model));
        $('.searchbar-cancel').click();
		bindEvents(params.bindings);
    }

	function reRender(params) {
		$('.buildings-list ul').html(template(params.model));
		$('.buildings-list-header').text(params.header);
        $('.searchbar-cancel').click();
	}

	function bindEvents(bindings) {
		for (var i in bindings) {
			$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
		}
	}

    return {
        render: render,
		reRender: reRender
    };
});
