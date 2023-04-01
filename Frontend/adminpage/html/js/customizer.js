(function (jQuery) {
    "use strict";
    
    const storageDark = sessionStorage.getItem('dark')
    
    if($('body').hasClass('dark')){
        changeMode('true');
    } else {
        changeMode('true');
    }
    if (storageDark !== 'null') {
        changeMode(storageDark)
    }
    const urlParams = new URLSearchParams(window.location.search);
    const dark = urlParams.get('dark');
    if (dark !== null) {
		if (dark === 'true') {
			changeMode('true');
		}
	}
    jQuery(document).on("click", '#dark-mode' ,function (e) {
        const dark = $(this).attr('data-active');
        if (dark === 'true') {
            $(this).attr('data-active','false')
        } else {
            $(this).attr('data-active','true')
        }
        changeMode(dark)
    })
    function changeMode (dark) {
        const body = jQuery('body')
        if (dark === 'true') {
            $('#dark-mode').prop('checked', true).attr('data-active', 'false')
            $('#dark-mode').find('i').attr('class', 'ri-moon-clear-line')
            body.addClass('dark')
            dark = true
        } else {
            $('#dark-mode').prop('checked', false).attr('data-active', 'true');
            $('#dark-mode').find('i').attr('class', 'ri-sun-line')
            body.removeClass('dark')
            dark = false
        }
        updateSessionStorage(dark)
        const event = new CustomEvent("ChangeColorMode", {detail: {dark: dark} });
        document.dispatchEvent(event);
    }
    function updateSessionStorage(dark) {
        sessionStorage.setItem('dark', dark)
    }
    
})(jQuery)