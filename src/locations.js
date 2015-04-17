this.vj2 = this.vj2||{};

(function () {
    "use strict";

    var Locations = function (){
        vj2.Limb_config.call(this, "../resources/locations.json");
    };

    Locations.prototype = Object.create(vj2.Limb_config.prototype);
    Locations.prototype.constructor = Locations;
    vj2.Locations = Locations;
}());
