this.vj2 = this.vj2||{};

(function () {
    "use strict";

    var Orientations = function (){
        vj2.Limb_config.call(this, "../resources/orientations.json");
    };

    Orientations.prototype = Object.create(vj2.Limb_config.prototype);
    Orientations.prototype.constructor = Orientations;
    vj2.Orientations = Orientations;
}());
