/**
 * The CoolRom origin configuration class
 */
var searchUrl = 'http://coolrom.com/search?q={query}&callback=?';
var downloadUrl = 'http://www.coolrom.com/dlpop.php?id={gameId}&callback=?';

crawler.public.crawlFunction = function() {

    var coolromFetchTemplate = {
        "{query}": romCrawler.public.searchQuery
    };
    var proxyFetchTemplate = {
        "{url}": escape(stringTemplate(coolromFetchTemplate, searchUrl))
    };

    var gameArray = [];

    $.getJSON(stringTemplate(proxyFetchTemplate, crawler.config.ajaxProxy), function(data) {
        var regex = /<a href=\"\/roms\/(.*?)\<br><br>/gi;
        var match = regex.exec(data.contents);
        var results = match[0].split("<br />");
        for (obj in results) {
            var currentEl = results[obj].split(" &raquo ");
            if (currentEl[1]) {

                var regex = /\/roms\/(.*?)\/(.*?)\//gi;
                var match = regex.exec(currentEl[1]);

                var currentGame = {
                    from: "coolrom",
                    platform: currentEl[0].replace(/(<([^>]+)>)/ig, ""),
                    gameId: match[2],
                    gameName: currentEl[1].replace(/(<([^>]+)>)/ig, "")
                };
                gameArray.push(currentGame);
            }
        }
        crawler.public.theGameArray["coolrom"] = gameArray;
        romCrawler.controller.populateRomList(crawler.public.theGameArray["coolrom"]);
    });
}
crawler.public.downloadGame["coolrom"] = function(gameId) {

    var coolromDlTemplate = {
        "{gameId}": gameId
    };
    var proxyDlTemplate = {
        "{url}": escape(stringTemplate(coolromDlTemplate, downloadUrl))
    };

    $.getJSON(stringTemplate(proxyDlTemplate, crawler.config.ajaxProxy), function(data) {
        var regex = /<br><form method=\"POST\" action=\"(.*?)\">/gi;
        var match = regex.exec(data.contents);
        console.log(match);
        window.location = match[1];
        waitScreen.hide();
    });
}