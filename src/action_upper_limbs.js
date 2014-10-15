this.vj2 = this.vj2||{};

(function () {
    "use strict";

    function Action_upper_limbs(human_model){
        this.human_model = human_model;
    }

    var p = Action_upper_limbs.prototype;

    p.create_upper_limbs = function(){
        var arm_bones_left = this.create_arm_bones("LEFT");
        var arm_bones_right = this.create_arm_bones("RIGHT"); 
        var hand_left = this.create_hand("LEFT");
        var hand_right = this.create_hand("RIGHT");
        this.upper_limbs_left= new vj2.Upper_limbs(hand_left,arm_bones_left,"LEFT");
        this.upper_limbs_right= new vj2.Upper_limbs(hand_right,arm_bones_right,"RIGHT");

        this.locations = null;
        this.current_location = "DEFAULT";
        this.bones_moving = [];
        load_json("/src/locations.json", (function(self) {
            return function(obj) {
                self.locations = obj;
            };
        }(this)));
    };

    p.update_left = function(yaw,pitch,roll,loc){
        this.upper_limbs_left.update(yaw,pitch,roll,loc);
    };

    p.update_right = function(yaw,pitch,roll,loc){
        this.upper_limbs_right.update(yaw,pitch,roll,loc);
    };

    p.update_both = function(yaw,pitch,roll,loc){
        this.move_to_location(loc);
    };

    p.update_wrist = function(yaw,pitch,roll){
        this.upper_limbs_right.update_wrist(yaw,pitch,roll);
        this.upper_limbs_left.update_wrist(yaw,pitch,roll);
    };

    p.set_shape = function(shape){
        this.upper_limbs_right.set_shape(shape);
        this.upper_limbs_left.set_shape(shape);
    };

    p.animation = function(dt){
        /*this.upper_limbs_right.animation(dt);
        this.upper_limbs_left.animation(dt);*/

        var removed_bones = [];
        for(var i = 0; i < this.bones_moving.length; i++)
        {
            var b = this.bones_moving[i];
            b.update(dt);
            if(b.done) removed_bones.push(i);
        }

        for (var j = 0; j < removed_bones.length; j++)
            this.bones_moving.splice(removed_bones[j], 1);
    };

    p.get_bone = function(bone_name){
        var bones = this.human_model.skeleton.bones;
        for(var i = 0; i < bones.length; i++)
            if(bones[i].name == bone_name)
                return bones[i];
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

    p.move_to_location = function(location_name){
        if(this.locations !== null)
        {
            var loc = this.locations[location_name];
            for(var s in loc)
            {
                var anim_bone = this.create_animated_bone(s, 1.5);
                if(anim_bone.done)
                    this.bones_moving.push(anim_bone); 
                anim_bone.set_rotation(loc[s].x,loc[s].y,loc[s].z);
            }
        }
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

    vj2.Action_upper_limbs = Action_upper_limbs;
}());
