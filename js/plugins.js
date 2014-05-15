// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function() {
    };
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});
    while (length--) {
        method = methods[length];
        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());
/**
 * Retrieves a specific GET parameter from specified URL.
 * 
 * @param {string} $getParameter The parameter to retrieve
 * @param {string} url The URL to retrieve the GET
 * @returns {string} The specified parameter
 */
function retrieveGet($getParameter, url)
{
    var $_GET = {};
    if (url === "" || url === null) {
        url = document.location.search;
    } else {
        url = "?" + url.split("?")[1];
    }
    url.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function() {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        $_GET[decode(arguments[1])] = decode(arguments[2]);
    });
    if (typeof $_GET[$getParameter] !== "undefined") {
        return $_GET[$getParameter];
    } else {
        return false;
    }
}
/**
 * Add a static element to the head tags.
 * 
 * @param {string} type The static file type (<strong>css</strong> or <strong>script</strong>)
 * @param {string} id Custom element id<br/>
 * <i>(to removal purposes if you need)</i>
 * @param {string} filename The path for the static file
 * @param {function} callback The callback method to run after add it
 */
function addStaticObject(type, id, filename, callback) {
    var fileref;
    switch (type) {
        case "css":
            fileref = document.createElement("link");
            fileref.setAttribute("id", id);
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", filename);
            break;
        case "script":
            fileref = document.createElement('script');
            fileref.setAttribute("id", id);
            fileref.setAttribute("type", "text/javascript");
            fileref.setAttribute("src", filename);
            break;
        default:
            break;
    }
    document.getElementsByTagName("head")[0].appendChild(fileref);
    if (typeof callback === "function") {
        var interval = setInterval(function() {
            if (typeof fileref !== "undefined") {
                callback();
                clearInterval(interval);
            }
        }, 500);
    }
}
/**
 * Remove a static element from DOM
 * 
 * @param {string} id Custom element id
 */
function delStaticObject(id) {
    (elem = document.getElementById(id)).parentNode.removeChild(elem);
}

var loadingBar = {
    config: {
        loadingBarElement: "#loadingbar"
    },
    /**
     * <p>Starts to move the loading bar.</p>
     * 
     * <p>In AJAX requests, this function should go at the 'beforeSend'
     * property.</p>
     * 
     * e.g.:
     * <pre>
     * $.ajax({
     *   type: 'GET',
     *   url: 'http://google.com',
     *   beforeSend: loadingBar.start()
     * })
     * .always(function(){
     *   loadingBar.end(function(){
     *       alert('The load has been completed');
     *   });
     * });
     * </pre>
     */
    start: function() {
        // Adds the loading bar stylesheet
        addStaticObject("css", "loadbar-css", "css/loadingbar.css");
        if ($(loadingBar.config.loadingBarElement).length === 0) {
            $("body").append("<div id='" + loadingBar.config.loadingBarElement.substring(1) + "' class='loadbar-component'></div>");
            $(loadingBar.config.loadingBarElement).addClass("waiting").append($("<dt/><dd/>"));
            $(loadingBar.config.loadingBarElement).width((50 + Math.random() * 30) + "%");
        }
    },
    /**
     * <p>Fill the loading bar at 100% of screen and deletes it.</p>
     * 
     * <p>In AJAX requests this function should go in the 'always()' callback.</p>
     * 
     * e.g.:
     * <pre>
     * $.ajax({
     *   type: 'GET',
     *   url: 'http://google.com',
     *   beforeSend: loadingBar.start()
     * })
     * .always(function(){
     *   loadingBar.end(function(){
     *       alert('The load has been completed');
     *   });
     * });
     * </pre>
     * @param {function} callback The callback method to run after the load bar
     * completes the screen.
     */
    end: function(callback) {
        $(loadingBar.config.loadingBarElement).width("101%").delay(200).fadeOut(400, function() {
            $(this).remove();
            // Removes the loading bar stylesheet
            (elem = document.getElementById("loadbar-css")).parentNode.removeChild(elem);
            if (callback) {
                callback();
            }
        });
    }
};
