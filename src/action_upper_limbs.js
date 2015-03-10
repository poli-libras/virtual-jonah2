this.vj2 = this.vj2||{};

(function () {
    "use strict";

    function Action_upper_limbs(human_model, scene){
        this.human_model = human_model;
        this.scene = scene;

        this.upper_limbs_left = this.create_upper_limb("LEFT");
        this.upper_limbs_right = this.create_upper_limb("RIGHT");

        this.bones_moving = new vj2.List();
        this.eulerMode = false;

        this.locations = new vj2.Locations();
        this.orientations = new vj2.Orientations();
        this.shapes = new vj2.Shapes();
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
        var g = this.get_model_bone(label).getWorldQuaternion();
        console.log(label + " - GLOBAL: (" + g.x + ", " + g.y + ", " + g.z + ", " + g.w + ")");

        var q = this.get_model_bone(label).quaternion;
        console.log(label + " - LOCAL: (" + q.x + ", " + q.y + ", " + q.z + ", " + q.w + ")");
    };

    p.show_edit_controls = function(e){
        if(this.eulerMode)
        {
            $(".debug-controls").hide();
            $("#" + $("#select-edit-side").val() + "-" + $("#select-edit-part").val()).show();
        }
    };

    p.reset_model_pose = function(){
        for(var bone_name in this.animated_bone_pool)
        {
            var anim_bone = this.animated_bone_pool[bone_name];
            anim_bone.set_quaternion(0, 0, 0, 1);
        }
    };

    p.toggle_debug = function(){
        this.reset_model_pose();        
        this.eulerMode = !this.eulerMode;
        if(this.eulerMode) {
            $("#select-edit-part").show();
            $("#select-edit-side").show();
            this.show_edit_controls();
        }
        else {
            $(".debug-controls").hide();
            $("#select-edit-part").hide();
            $("#select-edit-side").hide();
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
        this.quaternionUpdate(dt);
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

    p.set_hand = function(limb, location_name, orientation_name, shape_name)
    {
        limb = (typeof limb === 'undefined') ? 'both' : limb;

        var loc = this.locations.get_config(location_name, limb);
        var or = this.orientations.get_config(orientation_name, limb);
        var sp = this.shapes.get_config(shape_name, limb);

        var bone, loc_bone, anim_bone, bone_name;

        var prev_quaternions = {};
        var next_quaternions = {};

        for(bone_name in loc)
        {
            bone = this.get_model_bone(bone_name);
            loc_bone = loc[bone_name];
            prev_quaternions[bone_name] = bone.quaternion.clone();
            bone.quaternion.set(loc_bone.x, loc_bone.y, loc_bone.z, loc_bone.w);
        }
        this.scene.updateMatrixWorld(true);
        this.human_model.skeleton.update();

        for(bone_name in or)
        {
            var obj_name = bone_name;
            var obj_q = or[bone_name];
            bone = this.get_model_bone(obj_name);
            loc_bone = new THREE.Quaternion().multiplyQuaternions(
                bone.parent.getWorldQuaternion().clone().inverse(), 
                new THREE.Quaternion().set(obj_q.x, obj_q.y, obj_q.z, obj_q.w));

            if(loc[obj_name] !== undefined)
            {
                var loc_bone2 = loc[obj_name];
                loc_bone = new THREE.Quaternion().multiplyQuaternions(
                    loc_bone, 
                    new THREE.Quaternion().set(loc_bone2.x, loc_bone2.y, loc_bone2.z, loc_bone2.w));
            }
            next_quaternions[obj_name] = loc_bone;
        }

        for(bone_name in prev_quaternions)
        {
            bone = this.get_model_bone(bone_name);
            loc_bone = prev_quaternions[bone_name];
            bone.quaternion.set(loc_bone.x, loc_bone.y, loc_bone.z, loc_bone.w);
        }
        this.scene.updateMatrixWorld(true);
        this.human_model.skeleton.update();

        for(bone_name in next_quaternions)
        {
            anim_bone = this.get_animated_bone(bone_name);
            loc_bone = next_quaternions[bone_name];
            if(anim_bone.done)
            {
                this.bones_moving.add(anim_bone);
                anim_bone.animate_to(loc_bone.x,loc_bone.y,loc_bone.z,loc_bone.w, 1.5);
            }
        }

        for(bone_name in loc)
        {
            anim_bone = this.get_animated_bone(bone_name);
            if(anim_bone.done)
            {
                this.bones_moving.add(anim_bone); 
                loc_bone = loc[bone_name];
                anim_bone.animate_to(loc_bone.x,loc_bone.y,loc_bone.z,loc_bone.w, 1.5);
            } 
        }
        
        for(bone_name in sp)
        {
            anim_bone = this.get_animated_bone(bone_name);
            if(anim_bone.done)
            {
                this.bones_moving.add(anim_bone); 
                loc_bone = sp[bone_name];
                anim_bone.animate_to(loc_bone.x,loc_bone.y,loc_bone.z,loc_bone.w, 1.5);
            } 
        }
    };

    vj2.Action_upper_limbs = Action_upper_limbs;
}());
