this.vj2 = this.vj2||{};

(function () {
    "use strict";
    function Sign_config_loader(){}

    var p = Sign_config_loader.prototype = Object.create(vj2.Config_loader.prototype);
    Sign_config_loader.prototype.constructor = Sign_config_loader;

    vj2.Sign_config_loader = Sign_config_loader;
}());
