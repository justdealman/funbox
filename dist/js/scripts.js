$(function() {

	function selectGoods(e) {
		
		if ( !e.parents('[data-goods-item]').hasClass('goods__item_is-disabled') ) {

			var container = e.parents('[data-goods]');
			var id = e.attr('data-goods-link');
			var target = container.find('[data-goods-item="'+id+'"]');

			if ( !target.hasClass('goods__item_is-selected') ) {
				target.removeClass('goods__item_is-default').addClass('goods__item_is-selected');
			} else {
				target.removeClass('goods__item_is-selected').addClass('goods__item_is-default');
			}

			if ( e.hasClass('has-hover') ) {
				e.removeClass('has-hover')
			}

		}

	}
	
	$('[data-goods-link]').on('click', function() {
		selectGoods($(this));
	});
	
	$('.item-goods').on('mouseleave', function(event) {
		if ( !$(this).hasClass('has-hover') ) {
			$(this).addClass('has-hover');
		}
	});

});