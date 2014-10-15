this.vj2 = this.vj2||{};

(function () {
    "use strict";

    function Animated_bone(quaternion, duration){
        this.quaternion = quaternion;
        this.quaternion_next = quaternion.clone();
        this.quaternion_prev = quaternion.clone();

        this.duration = duration;
        this.current_time = duration;

        this.eulerHelper = new THREE.Euler(0,0,0);
        this.quaternionHelper = new THREE.Quaternion(0,0,0);
        this.done = true;
    }

    var p = Animated_bone.prototype;

    p.update_rotation = function(x,y,z){
        this.eulerHelper.set(x,y,z);
        this.quaternionHelper.setFromEuler(this.eulerHelper);
        this.quaternion_next.multiply(this.quaternionHelper);
        this.current_time = this.duration;
        this.done = false;
    };

    p.set_rotation = function(x,y,z){
        this.eulerHelper.set(x,y,z);
        this.quaternion_next.setFromEuler(this.eulerHelper);
        this.current_time = this.duration;
        this.done = false;
    };

    p.update = function(dt){
        this.interpolate(this.current_time/this.duration);
        this.current_time -= Math.min(dt, this.current_time);
    };

    p.interpolate = function(factor){
        THREE.Quaternion.slerp(this.quaternion_next, this.quaternion_prev,
                this.quaternion, factor);
        if(factor === 0)
            this.update_rotation_prev();
    };

    p.update_rotation_prev = function(){
        this.quaternion_prev.copy(this.quaternion_next);
        this.done = true;
    };

    p.reset_animation = function(){
        this.current_time = this.duration;
    };

    vj2.Animated_bone = Animated_bone;
}());
