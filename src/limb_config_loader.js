this.vj2 = this.vj2||{};

(function () {
    "use strict";
    function Limb_config_loader(){}

    var p = Limb_config_loader.prototype = Object.create(vj2.Config_loader.prototype);
    Limb_config_loader.prototype.constructor = Limb_config_loader;

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
