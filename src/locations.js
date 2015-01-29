this.vj2 = this.vj2||{};

(function () {
    "use strict";

    function Locations(path){
        load_json(path, (function(self) {
            return function(obj) {
                self.locations = obj;
            };
        }(this)));
    }

    var p = Locations.prototype;

    p.getLocation = function(id) {
        return this.locations[id];
    };

    vj2.Locations = Locations;
}());
