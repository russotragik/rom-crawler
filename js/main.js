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
    if (retrieveGet("s", document.location.search).length > 0) {
        romCrawler.public.searchQuery = retrieveGet("s", document.location.search);
        romCrawler.controller.containers.romlistFormat();
        loadingBar.start();
        $.getScript('classes/crawler.js', function() {
            crawler.populate();
        });
    }
});