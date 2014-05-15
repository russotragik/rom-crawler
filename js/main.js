$(document).ready(function() {
    if(retrieveGet("s", document.location.search).length > 0) {
        $.getJSON('http://anyorigin.com/dev/get?url=' + escape('http://coolrom.com/search?q='+retrieveGet("s", document.location.search)) + '&callback=?', function(data) {
            var regex = /<a href=\"\/roms\/(.*?)\<br><br>/gi;
            var match = regex.exec(data.contents);
            var results = match[0].split("<br />");
            for (obj in results) {
                var currentEl = results[obj].split(" &raquo ");
                if (currentEl[1]) {

                    var regex = /\/roms\/(.*?)\/(.*?)\//gi;
                    var match = regex.exec(currentEl[1]);
                    $('#romContent').prepend('' +
                            '<tr>' +
                            '<td>' +
                            currentEl[0].replace(/(<([^>]+)>)/ig, "") +
                            '</td>' +
                            '<td id="rom-element" data-id="' + match[2] + '" data-target="coolrom">' +
                            currentEl[1].replace(/(<([^>]+)>)/ig, "") +
                            '</td>' +
                            '</tr>');
                }
            }
        });

        $('body').on('click', 'td#rom-element', function() {
            $.getJSON('http://anyorigin.com/dev/get?url=' + escape('http://www.coolrom.com/dlpop.php?id='+$(this).attr('data-id')) + '&callback=?', function(data) {
                var regex = /<br><form method=\"POST\" action=\"(.*?)\">/gi;
                var match = regex.exec(data.contents);
                window.location.href = match[1];
            });
        });
    }
});