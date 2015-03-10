this.vj2 = this.vj2||{};

(function () {
    "use strict";

    var Orientations = function (){
        this.load("../resources/orientations.json");
    };

    Orientations.prototype = Object.create(vj2.Limb_config.prototype);
    vj2.Orientations = Orientations;
}());
