this.vj2 = this.vj2||{};

(function () {
    "use strict";
    function Limb_config_loader(){}

    var p = Limb_config_loader.prototype;

    p.load = function(path, callback)
    {
        this.loadAjaxJSON(this, path, callback);
    };

    p.loadAjaxJSON = function(context, path, callback)
    {
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
        var result = new vj2.Limb_config();
        result.right = json_data;
        result.left = {};
        for(var k in result.right)
        {
            var loc_right = result.right[k];
            var loc_left = {};
            for(var l in loc_right)
            {
                var id = l.split("_")[0];
                var q_left = {};
                q_left.x = loc_right[l].x;
                q_left.y = -loc_right[l].y;
                q_left.z = -loc_right[l].z;
                q_left.w = loc_right[l].w;
                loc_left[id + "_L"] = q_left;
            }
            result.left[k] = loc_left;
        }

        return result;
    };

    vj2.Limb_config_loader = Limb_config_loader;
}());
