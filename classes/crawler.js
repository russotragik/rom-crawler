var crawler = {
    public: {
        fetchContents: false,
        searchUrl: false,
        searchQuery: false
    },
    config: {
        ajaxProxy: 'http://anyorigin.com/dev/get?url={url}&callback=?',
        origins: ['coolrom.js']
    },
    populate: function() {
        for (key in crawler.config.origins) {
            $.getScript('classes/origins/' + crawler.config.origins[key], function(){
                console.log(crawler.public.searchUrl);
            });
        }
        loadingBar.end();
        romCrawler.controller.labels.manageRomListSearch(romCrawler.public.searchQuery);
    },
    /**
     * Fetchs an URL by using config.ajaxProxy and set the contents to
     * crawler.public.fetchContents.
     * 
     * @param {String} url The url to fetch
     * @returns {bool} If succeed
     */
    fetch: function(url) {
        var fetchUrl = crawler.config.ajaxProxy.replace("{url}", escape(url));
        $.getJSON(fetchUrl, function(data) {
            if (data.contents.length > 0) {
                crawler.public.fetchContents = data.contents;
                return true;
            } else {
                return false;
            }
        });
    }
};