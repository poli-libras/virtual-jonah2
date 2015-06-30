this.vj2 = this.vj2||{};

(function () {
    "use strict";
    function Config_loader(){}

    var p = Config_loader.prototype;

    p.load = function(path, callback)
    {
        this.loadAjaxJSON(this, path, callback);
    };

    p.loadAjaxJSON = function(context, path, callback)
    {
        // TODO fazer essa chamada usando JQuery
        var xhr = new XMLHttpRequest();
        var length = 0;

        xhr.onreadystatechange = function () 
        {
            if (xhr.readyState === xhr.DONE) 
            {
                if (xhr.status === 200 || xhr.status === 0) 
                {
                    if (xhr.responseText) 
                    {
                        var obj = JSON.parse(xhr.responseText);
                        var result = context.parse(obj);
                        callback(result);
                        
                    } 
                    else 
                    {
                        console.error('load_limb_config: "' + path + 
                                '" seems to be unreachable or the file is empty.');
                    }
                } 
                else 
                {
                    console.error('load_limb_config: Couldn\'t load "' + path + '" (' + xhr.status + ')' );
                }
            }
        };
        xhr.open('GET', path, true );
        xhr.withCredentials = false;
        xhr.send(null);

    };

    p.parse = function(json_data)
    {
        return json_data;
    };

    vj2.Config_loader = Config_loader;
}());
