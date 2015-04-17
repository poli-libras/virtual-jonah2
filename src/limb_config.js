this.vj2 = this.vj2||{};

(function () {
    "use strict";

    function Limb_config(path) 
    {
        this.load_json(path);
    }

    var p = Limb_config.prototype;

    p.get_config = function(id, limb)
    {
        var ret = {};
        var k = "";

        if(limb == "right") 
            for(k in this.right[id]) ret[k] = this.right[id][k];
        else if(limb == "left") 
            for(k in this.left[id]) ret[k] = this.left[id][k];
        else 
        {
            for(k in this.right[id]) ret[k] = this.right[id][k];
            for(k in this.left[id]) ret[k] = this.left[id][k];
        }
        return ret;
    };

/*
 *
 * Baseado no JSONLoader da biblioteca THREEJS
 * (https://github.com/mrdoob/three.js/blob/1769fbfc6c994b51a54c15a5c096855fd3cb8a1a/src/loaders/JSONLoader.js)
 *
 */
    p.load_json = function(url)
    {
        var xhr = new XMLHttpRequest();
        var length = 0;

        var self = this;
        xhr.onreadystatechange = function () 
        {
            if (xhr.readyState === xhr.DONE) 
            {
                if (xhr.status === 200 || xhr.status === 0) 
                {
                    if (xhr.responseText) 
                    {
                        var json = JSON.parse(xhr.responseText);
                        // JSON loaded
                        self.right = json;
                        self.left = {};
                        for(var k in self.right)
                        {
                            var loc_right = self.right[k];
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
                            self.left[k] = loc_left;
                        }
                    } 
                    else 
                    {
                        console.error('load_limb_config: "' + url + 
                                '" seems to be unreachable or the file is empty.');
                    }
                } 
                else 
                {
                    console.error('load_limb_config: Couldn\'t load "' + url + '" (' + xhr.status + ')' );
                }
            }
        };
        xhr.open('GET', url, true );
        xhr.withCredentials = false;
        xhr.send(null);
    };

    vj2.Limb_config = Limb_config;
}());
