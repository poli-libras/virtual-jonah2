this.vj2 = this.vj2||{};

(function () {
    "use strict";

    var Locations = function (){
        this.load("../resources/locations.json");
    };

    Locations.prototype = Object.create(vj2.Limb_config.prototype);
    vj2.Locations = Locations;
}());
