var romCrawler = {
    public: {
        searchQuery: false
    },
    config: {
        messages: {
            searchResults: 'Sua pesquisa por <strong>{search}</strong> retornou <strong>{results}</strong> resultados'
        }
    },
    controller: {
        liveEvents: function() {
            $('body').on('click', 'td#rom-element a', function(e) {
                waitScreen.show();
                e.preventDefault();
                crawler.public.downloadGame[$(this).attr('data-from')]($(this).attr('data-gameId'));
            });
        },
        populateRomList: function(gameArray) {
            for(object in gameArray){
                $('#romContent').append(
                        '<tr>'+
                            '<td>'+
                                gameArray[object].platform+
                            '</td>'+
                            '<td id="rom-element">'+
                                '<a href="#" data-gameId="'+gameArray[object].gameId+'" data-from="'+gameArray[object].from+'">'+gameArray[object].gameName+'</a>'+
                            '</td>'+
                            '<td>'+
                                gameArray[object].from+
                            '</td>'+
                        '</tr>');
            }
            romCrawler.controller.labels.manageRomListSearch(romCrawler.public.searchQuery);
        },
        containers: {
            homeFormat: function(){
                $('form.navbar-form.navbar-left').hide();
                $('.container .home').show();
                $('.container .rom-list').hide();
            },
            romlistFormat: function(){
                $('form.navbar-form.navbar-left').show();
                $('form.navbar-form.navbar-left input').val(retrieveGet("s", document.location.search));
                $('.container .home').hide();
                $('.container .rom-list').show();
            }
        },
        labels: {
            manageRomListSearch: function(search) {
                var template = {
                    "{search}": search,
                    "{results}": $('.rom-list table tbody tr').length
                };
                var resultMessage = romCrawler.config.messages.searchResults;
                for(key in template){
                    resultMessage = resultMessage.replace(key, template[key]);
                }
                $('.rom-list .page-header h1').html(resultMessage);
            }
        },
        warning: {
            show: function(){
                
            },
            hide: function(){
                
            }
        },
        loading: {
            show: function() {
                
            },
            hide: function() {
                
            }
        }
    }
};
$(document).ready(function() {
    romCrawler.controller.containers.homeFormat();
    romCrawler.controller.liveEvents();
    if (retrieveGet("s", document.location.search).length > 0) {
        romCrawler.public.searchQuery = retrieveGet("s", document.location.search);
        romCrawler.controller.containers.romlistFormat();
        loadingBar.start();
        $.getScript('classes/crawler.js', function() {
            crawler.populate();
        });
    }
});