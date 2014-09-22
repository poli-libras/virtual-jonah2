this.vj2 = this.vj2||{};

(function () {
    "use strict";

    function Bone(quaternion){
        this.quaternion = quaternion;

        this.quaternion_next = quaternion.clone();
        this.quaternion_prev = quaternion.clone();

        this.eulerHelper = new THREE.Euler(0,0,0);
    }

    var p = Bone.prototype;

    p.update_rotation = function(x,y,z){
        this.eulerHelper.setFromQuaternion(this.quaternion_next);

        this.eulerHelper.x += x;
        this.eulerHelper.y += y;
        this.eulerHelper.z += z;

        this.quaternion_next.setFromEuler(this.eulerHelper);
    };

    p.set_rotation = function(x,y,z){
        this.eulerHelper.set(x,y,z);
        this.quaternion_next.setFromEuler(this.eulerHelper);
    };

    p.interpolate = function(factor){
        THREE.Quaternion.slerp(this.quaternion_next, this.quaternion_prev,
                this.quaternion, factor);
        if(factor === 0)
            this.update_rotation_prev();
    };

    p.update_rotation_prev = function(){
        this.quaternion_prev.copy(this.quaternion_next);
    };

    vj2.Bone = Bone;
}());
