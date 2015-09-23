$(function() {

    /**
     * Enable scroll to on links
     */
    $('a[data-action=scroll_to]').click(function() {
        var target = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 500);

        // track the click event
        analytics.track(target.substr(1));

        return false;
    });


    /**
     * Flickr display
     * http://codepen.io/gabrieleromanato/pen/nfqJi
     * @constructor
     */
    function getFlickrGallery(dom_id, nsid, set) {
        $.getJSON(
            "http://api.flickr.com/services/feeds/photoset.gne?jsoncallback=?",
            {
                "nsid": nsid,
                "set": set,
                "format": "json"
            },
            function (data) {
                if (data && data.items) {
                    var title = data.title;
                    var items = data.items;
                    var albumTitle = title.replace("Content from ", "");
                    var html = ""; // "<h3>" + albumTitle + "</h3>";

                    for (var i = 0; i < items.length; ++i) {
                        var item = items[i];
                        html += "<div class='gallery-cell photo-cell'>";
                        html += "<a target='_blank' href='" + item.link + "'><img data-flickity-lazyload='" + item.media.m + "' alt='' /></a>";
                        html += "</div>";
                    }

                    document.querySelector(dom_id).innerHTML = html;
                    $(dom_id).flickity({
                        // options
                        cellAlign: 'left',
                        contain: true,
                        imagesLoaded: true,
                        lazyLoad: 5,
                        pageDots: false
                    });
                }
            }
        );
    }

    getFlickrGallery("#flickr-gallery-hk", "85734830@N00", "72157650070566351");
    getFlickrGallery("#flickr-gallery-climbing", "85734830@N00", "72157656652450713");
    getFlickrGallery("#flickr-gallery-travelling", "85734830@N00", "72157649654809407");


});