this.vj2 = this.vj2||{};

(function () {
    "use strict";

    function Locations(path){
        load_json(path, (function(self) {
            return function(obj) {
                self.ar_locations = obj;
            };
        }(this)));
    }

    var p = Locations.prototype;

    p.getLocation = function(id) {
        return this.ar_locations[id];
    };

    vj2.Locations = Locations;
}());
