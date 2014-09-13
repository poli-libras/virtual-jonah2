this.vj2 = this.vj2||{};

(function () {
    "use strict";

    function Bone(rotation){
        this.rotation = rotation;
        this.rotation_next = this.clone_rotation(rotation);
        this.rotation_prev = this.clone_rotation(rotation);
    }

    var p = Bone.prototype;

    p.clone_rotation = function(rotation){
        // Euler angle - represents the orientation of the bone in the 3D space
        var clone = new THREE.Euler(0,0,0,"XYZ");
        var quaternion_rotation = new THREE.Quaternion().setFromEuler(rotation);
        clone.copy(rotation);
        clone._quaternion = quaternion_rotation;
        return clone;
    };

    p.update_rotation = function(x,y,z){
        this.rotation_next.x += x;
        this.rotation_next.y += y;
        this.rotation_next.z += z;
    };

    p.set_rotation = function(x,y,z){
        this.rotation_next.x = x;
        this.rotation_next.y = y;
        this.rotation_next.z = z;
    };

    p.animation = function(time){
        THREE.Quaternion.slerp(this.rotation_next._quaternion,this.rotation_prev._quaternion,this.rotation._quaternion,time);
        if(time === 0)
            this.update_rotation_prev();
    };

    p.update_rotation_prev = function(){
        this.rotation_prev = this.clone_rotation(this.rotation_next);
    };

    vj2.Bone = Bone;
}());
