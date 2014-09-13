this.vj2 = this.vj2||{};

(function () {
    "use strict";

    function Bone(rotation){
        this.rotation = rotation;
        this.rotation_next = this.clone_rotation(rotation);
        this.rotation_prev = this.clone_rotation(rotation);
    }

    Bone.prototype.clone_rotation = function(rotation){
        var clone = new THREE.Euler(0,0,0,"XYZ");
        var quaternion_rotation = new THREE.Quaternion().setFromEuler(rotation);
        clone.copy(rotation);
        clone._quaternion = quaternion_rotation;
        clone._quaternion._euler = clone;
        return clone;
    };

    Bone.prototype.update_rotation = function(x,y,z){
        this.rotation_next.x += x;
        this.rotation_next.y += y;
        this.rotation_next.z += z;
    };

    Bone.prototype.set_rotation = function(x,y,z){
        this.rotation_next.x = x;
        this.rotation_next.y = y;
        this.rotation_next.z = z;
    };

    Bone.prototype.animation = function(time){
        THREE.Quaternion.slerp(this.rotation_next._quaternion,this.rotation_prev._quaternion,this.rotation._quaternion,time);
        if(time === 0)
            this.update_rotation_prev();
    };

    Bone.prototype.update_rotation_prev = function(){
        this.rotation_prev = this.clone_rotation(this.rotation_next);
    };

    vj2.Bone = Bone;
}());
