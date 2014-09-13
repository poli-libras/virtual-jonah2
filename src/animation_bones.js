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
        this.map_animation(this.time_now/this.animation_time);
        this.run_time(dt);
    };

    p.map_animation = function(time){
        this.list_bones.forEach(function(bone){
            bone.animation(time);
        });
    };

    p.run_time = function(dt){
        if(this.time_now > 0){
            this.time_now -= dt;
        }else
            this.reset_time();
    };

    p.reset_time = function(){
        this.time_now = this.animation_time;
    };

    vj2.Animation_bones = Animation_bones;
}());
