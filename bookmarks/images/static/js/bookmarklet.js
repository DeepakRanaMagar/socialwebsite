(function(){
    var jquery_version = '2.1.4';
    var site_url = 'http://127.0.0.1:8000/';
    var static_url = site_url + 'static/';
    var min_width = 100;
    var min_height = 100;

    function bookmarklet(){
        // load css
        var css = jQuery('<link>');
        css.attr({
            rel: 'stylesheet',
            type: 'text/css',
            href: static_url + 'css/bookmarklet.css?r=' + Math.floor(Math.random() * 99999999999999999999)
        });
        jQuery('head').append(css);
        
        // load HTML
        var box_html = '<div id="bookmarklet"><a href="#" id="close">&times;</a><h1>Select an image to bookmark:</h1><div class="images"></div></div>';
        
        jQuery('body').append(box_html);

        // close event
        jQuery('#bookmarklet #close').click(function(){
            jQuery('#bookmarklet').remove();
        });

        // find images and display them
        jQuery.each(jQuery('img[src$="jpg"]'), function(index, image) {
            if (jQuery(image).width() >= min_width && jQuery(image).height() >= min_height) {
                var image_url = jQuery(image).attr('src');
                jQuery('#bookmarklet .images').append('<a href="#"><img src="' + image_url + '" /></a>');
            }
        });
        // image is selected open URL with it 
        jQuery('#bookmarklet .images a').click(function(e){
            selected_image = jQuery(this).children('img').attr('src');
            // hide bookmarklet
            jQuery('#bookmarklet').hide();
            // open new window to submit the image
            window.open(site_url + 'images/create/?url=' + encodeURIComponent(selected_image) + '&title=' + encodeURIComponent(jQuery('title').text()),'_blank');
        });
    }
    
    // check if jQuery is already loaded
    if(typeof window.jQuery !== 'undefined'){
        bookmarklet();
    } else {
        // check for conflicts
        var conflict = typeof window.$ !== 'undefined'; 
        
        // create the script element and point to the Google API
        var script = document.createElement('script');
        script.setAttribute('src','http://ajax.googleapis.com/ajax/libs/jquery/' +
        jquery_version + '/jquery.min.js');
        
        // add the script to the 'head' for processing
        document.getElementsByTagName('head')[0].appendChild(script);

        // create a way to wait until script is loaded
        var attempts = 15;
        
        (function(){
            // check again if jQuery is still undefined 
            if(typeof window.jQuery === 'undefined'){
                if(--attempts > 0){
                    // call itself in a few milliseconds
                    window.setTimeout(arguments.callee, 250);
                } else {
                    // Too many attempts to load, send an error 
                    alert('ERROR: Failed to load jQuery.');
                }
            } else {
                bookmarklet();
            }
        })();
    }
})();
