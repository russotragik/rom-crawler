var crawler = {
    public: {
        searchQuery: false,
        crawlFunction: false,
        theGameArray: {},
        downloadGame: {}
    },
    config: {
        ajaxProxy: 'http://anyorigin.com/dev/get?url={url}&callback=?',
        origins: ['coolrom.js']
    },
    populate: function() {
        for (key in crawler.config.origins) {
            var currentOrigin = key;
            loadingBar.start();
            $.getScript('classes/origins/' + crawler.config.origins[key], function(){
                crawler.public.crawlFunction();
                loadingBar.end();
            });
        }
    }
};