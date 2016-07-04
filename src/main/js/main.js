$(document).ready(function() {
	/*$('.log').click(function() {
		var formValid = true;
		var id = $(this).attr('id').slice(0, -4);
		$('#' + id + '_modal input').each(function() {
			var formGroup = $(this).parents('.form-group');
			if (this.checkValidity()) {
				formGroup.addClass('has-success').removeClass('has-error');
			} else {
				formGroup.addClass('has-error').removeClass('has-success');
				formValid = false;  
			}
		});
		if (formValid) {
			$('#' + id + '_modal').modal('hide');
		}
	});*/
	$('.modal').on('hidden.bs.modal', function () {
		//document.focus()
	})

});
