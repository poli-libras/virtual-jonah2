this.vj2 = this.vj2||{};

(function () {
    "use strict";
    function Limb_config(){}

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

    vj2.Limb_config = Limb_config;
}());
