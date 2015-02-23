this.vj2 = this.vj2||{};

(function () {
    "use strict";

    function Action_upper_limbs(human_model, scene){
        this.human_model = human_model;
        this.scene = scene;

        this.upper_limbs_left = this.create_upper_limb("LEFT");
        this.upper_limbs_right = this.create_upper_limb("RIGHT");

        this.bones_moving = new vj2.List();
        this.bones_globally_locked = new vj2.List();
        this.locations = new vj2.Locations("../src/locations.json");
        this.eulerMode = false;
    }

    var p = Action_upper_limbs.prototype;

    //
    // Factory methods - [
    //

    p.create_upper_limb = function(direction){
        return new vj2.Upper_limbs(this.create_hand(direction),this.create_arm_bones(direction),direction);
    };

    p.create_arm_bones = function(direction){
        var up_arm_left = this.get_model_bone("UpArm_" + direction.charAt(0)).quaternion;
        var lo_arm_left = this.get_model_bone("LoArm_" + direction.charAt(0)).quaternion;
        var wrist_left = this.get_model_bone("Hand_" + direction.charAt(0)).quaternion;

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
            ar_bones.push(this.get_model_bone("Finger-" + finger_index + "-" + i + "_" + direction.charAt(0)).quaternion);

        return new vj2.Finger(ar_bones[0],ar_bones[1],ar_bones[2],direction);
    };
    
    //
    // Factory methods - ]
    //

    p.trace_quaternions = function(){
        this.trace_quaternions_side("LEFT");
        this.trace_quaternions_side("RIGHT");
    };
    
    p.trace_quaternions_side = function(side){
        console.log(side + " ARM");
        this.trace_quaternion("UpArm_" + side.charAt(0));
        this.trace_quaternion("LoArm_" + side.charAt(0));
        this.trace_quaternion("Hand_" + side.charAt(0));
        console.log("==================================================");

        for(var i = 1; i <=5; i++)
        {
            switch(i){
                case 1:
                    console.log(side + " THUMB");
                    break;
                case 2:
                    console.log(side + " INDEX");
                    break;
                case 3:
                    console.log(side + " MIDDLE");
                    break;
                case 4:
                    console.log(side + " RING");
                    break;
                case 5:
                    console.log(side + " PINKY");
                    break;
            }
            for(var j = 1; j<=3; j++)
            {
                this.trace_quaternion("Finger-" + i + "-" + j + "_" + side.charAt(0));
            }
            console.log("==================================================");
        }
    };

    p.trace_quaternion = function(label){
        var q = this.get_model_bone(label).quaternion;
        console.log(label + ": (" + q.x + ", " + q.y + ", " + q.z + ", " + q.w + ")");
    };

    p.show_edit_controls = function(e){
        if(this.eulerMode)
        {
            $(".debug-controls").hide();
            $("#" + $("#select-edit-side").val() + "-" + $("#select-edit-part").val()).show();
        }
    };

    p.reset_model_pose = function(){
        var loc = this.locations.getLocation("DEFAULT");
        for(var bone_name in loc)
        {
            var anim_bone = this.get_animated_bone(bone_name);
            anim_bone.set_quaternion(loc[bone_name].x, loc[bone_name].y,loc[bone_name].z,loc[bone_name].w);
        }
    };
    
    p.toggle_debug = function(){
        this.reset_model_pose();        
        this.eulerMode = !this.eulerMode;
        if(this.eulerMode) {
            $("#trace-quaternion").show();
            $("#select-edit-part").show();
            $("#select-edit-side").show();
            this.show_edit_controls();
            $(".main-controls").hide();
        }
        else {
            $(".debug-controls").hide();
            $("#trace-quaternion").hide();
            $("#select-edit-part").hide();
            $("#select-edit-side").hide();
            $(".main-controls").show();
        }
    };

    p.animated_bone_pool = {};
    p.get_animated_bone = function(name)
    {
        if(this.animated_bone_pool[name] === undefined)
            this.animated_bone_pool[name] = new vj2.Animated_bone(this.get_model_bone(name).quaternion);
        return this.animated_bone_pool[name];
    };

    p.update = function(dt){
        if(this.eulerMode) this.eulerUpdate(dt);
        else this.quaternionUpdate(dt);
    };

    p.eulerUpdate = function(dt){
        this.upper_limbs_right.update(dt);
        this.upper_limbs_left.update(dt);
    };

    p.quaternionUpdate = function(dt){
        var itr = this.bones_moving.head;
        while(itr !== null)
        {
            itr.obj.update(dt);
            if(itr.obj.done) this.bones_moving.remove(itr.obj);
            itr = itr.next;
        }
    };

    p.get_model_bone = function(bone_name){
        var bones = this.human_model.skeleton.bones;
        for(var i = 0; i < bones.length; i++)
            if(bones[i].name == bone_name)
                return bones[i];
    };

    p.set_location = function(location_name){
        var loc = this.locations.getLocation(location_name);

        for(var bone_name in loc)
        {
            var anim_bone = this.get_animated_bone(bone_name);
            if(anim_bone.done)
            {
                this.bones_moving.add(anim_bone); 
                anim_bone.animate_to(loc[bone_name].x,
                        loc[bone_name].y,loc[bone_name].z,loc[bone_name].w, 1.5);
            } 
        }
    };

    vj2.Action_upper_limbs = Action_upper_limbs;
}());
