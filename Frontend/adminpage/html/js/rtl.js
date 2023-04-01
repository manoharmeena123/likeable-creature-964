(function (jQuery) {
    "use strict";
    
    const storageRtl = sessionStorage.getItem('rtl')

    if (storageRtl !== 'null') {
        changeRtl(storageRtl);
    }

    if($('html').attr('dir') !== undefined && $('html').attr('dir') == 'rtl'){
        changeRtl('true');
    } else {
        changeRtl('false');
    }

    const urlParams = new URLSearchParams(window.location.search);

	const rtl = urlParams.get('rtl');
    
	if (rtl !== null) {
		if (rtl === 'true') {
			changeRtl('true');
		}
	}
        
    $(document).on("click",'[data-mode="rtl"]' ,function (e) {

        const rtl = $(this).attr('data-active');
        
        changeRtl(rtl)
    });
    
    function changeRtl(rtl) {
        if (rtl === 'true') {   
            $('html').attr("dir", "rtl");
            $('[data-mode="rtl"]').attr('data-active','false')
            $('[data-mode="rtl"]').find('i').attr('class','ri-text-direction-l')
            rtl = true;
        } else {
            $('html').attr("dir",'ltr');
            $('[data-mode="rtl"]').attr('data-active','true')
            $('[data-mode="rtl"]').find('i').attr('class','ri-text-direction-r')
            rtl = false;
        }

        updateSessionStorage(rtl)
        const event = new CustomEvent("ChangeRtl", {detail: {rtl: rtl} });
        document.dispatchEvent(event);
    }
    
    function updateSessionStorage(rtl) {
        sessionStorage.setItem('rtl', rtl);
    }


})(jQuery);