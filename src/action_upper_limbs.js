this.vj2 = this.vj2||{};

(function () {
    "use strict";

    function Action_upper_limbs(human_model){
        this.human_model = human_model;

        this.upper_limbs_left = this.create_upper_limb("LEFT");
        this.upper_limbs_right = this.create_upper_limb("RIGHT");

        this.bones_moving = new vj2.List();
        this.locations = new vj2.Locations("../src/locations.json");
    }

    var p = Action_upper_limbs.prototype;

    //
    // Factory methods - [
    //

    p.create_upper_limb = function(direction){
        return new vj2.Upper_limbs(this.create_hand(direction),this.create_arm_bones(direction),direction);
    };

    p.create_arm_bones = function(direction){
        var up_arm_left = this.get_bone("UpArm_" + direction.charAt(0)).quaternion;
        var lo_arm_left = this.get_bone("LoArm_" + direction.charAt(0)).quaternion;
        var wrist_left = this.get_bone("Hand_" + direction.charAt(0)).quaternion;

        return new vj2.Arm_bones(up_arm_left,lo_arm_left,wrist_left,direction);
    };

    p.create_hand = function(direction){
        var ar_fingers = [];

        for(var i = 1; i <=5; i++)
            ar_fingers.push(this.create_finger(i,direction));

        return new vj2.Hand(ar_fingers[0],ar_fingers[1],ar_fingers[2],ar_fingers[3],ar_fingers[4],direction);
    };

    p.create_finger = function(finger_index, direction){
        var ar_bones = [];

        for(var i = 1;i <=3; i++)
            ar_bones.push(this.get_bone("Finger-" + finger_index + "-" + i + "_" + direction.charAt(0)).quaternion);

        return new vj2.Finger(ar_bones[0],ar_bones[1],ar_bones[2],direction);
    };

    p.animated_bone_pool = {};
    p.create_animated_bone = function(name, time)
    {
        if(this.animated_bone_pool[name] !== undefined)
        {
            return this.animated_bone_pool[name];
        }
        else
        {
            this.animated_bone_pool[name] = new vj2.Animated_bone(this.get_bone(name).quaternion, time);
            return this.animated_bone_pool[name];
        }
    };

    //
    // Factory methods - ]
    //

    p.update_left = function(roll,yaw,pitch,loc){
        this.upper_limbs_left.update(roll,yaw,pitch,loc);
    };

    p.update_right = function(roll,yaw,pitch,loc){
        this.upper_limbs_right.update(roll,yaw,pitch,loc);
    };

    p.update_both = function(roll,yaw,pitch,loc){
        this.upper_limbs_left.update(roll,yaw,pitch,loc);
        this.upper_limbs_right.update(roll,yaw,pitch,loc);
    };

    p.update_wrist = function(roll,yaw,pitch){
        this.upper_limbs_right.update_wrist(roll,yaw,pitch);
        this.upper_limbs_left.update_wrist(roll,yaw,pitch);
    };

    p.set_shape = function(shape){
        this.upper_limbs_right.set_shape(shape);
        this.upper_limbs_left.set_shape(shape);
    };

    p.animation = function(dt){
        var itr = this.bones_moving.head;
        while(itr !== null)
        {
            itr.obj.update(dt);
            if(itr.obj.done)
            {
                this.bones_moving.remove(itr.obj);
            }
            itr = itr.next;
        }
    };

    p.get_bone = function(bone_name){
        var bones = this.human_model.skeleton.bones;
        for(var i = 0; i < bones.length; i++)
            if(bones[i].name == bone_name)
                return bones[i];
    };

    p.set_location = function(location_name){
        var loc = this.locations.getLocation(location_name);

        for(var s in loc)
        {
            var anim_bone = this.create_animated_bone(s, 1.5);
            if(anim_bone.done)
            {
                this.bones_moving.add(anim_bone); 
                anim_bone.set_quaternion(loc[s].x,loc[s].y,loc[s].z,loc[s].w);
            }
        }
    };

    vj2.Action_upper_limbs = Action_upper_limbs;
}());
