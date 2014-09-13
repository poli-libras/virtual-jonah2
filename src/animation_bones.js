this.vj2 = this.vj2||{};

(function () {
    "use strict";

    function Animation_bones(list_bones,animation_time){
        this.list_bones = list_bones;
        this.animation_time = animation_time;
        this.time_now = animation_time;
    }

    var p = Animation_bones.prototype;

    p.animation = function(dt){
        this.interpolate_bones(this.time_now/this.animation_time);
        this.time_now -= Math.min(dt, this.time_now);
    };

    p.interpolate_bones = function(factor){
        this.list_bones.forEach(function(bone){
            bone.interpolate(factor);
        });
    };

    p.reset_time = function(){
        this.time_now = this.animation_time;
    };

    vj2.Animation_bones = Animation_bones;
}());
