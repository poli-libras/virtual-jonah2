this.vj2 = this.vj2||{};

(function () {
    "use strict";

    function Limb_config(path) {}

    var p = Limb_config.prototype;

    p.load = function(path)
    {
        load_json(path, (function(self) {
            return function(obj){
                self.right = obj;
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
            };
        }(this)));
    };

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

    vj2.Limb_config = Limb_config;
}());
