this.vj2 = this.vj2||{};

(function () {
    "use strict";
    
    function Sign(parent, model, location, orientation, shape)
    {
        this.parent = parent;
        this.model = model;
        this.start_location = location;
        this.start_orientation = orientation;
        this.shape = shape;

        this.bones_moving = new vj2.List();

        this.transitions = [];
    }

    var p = Sign.prototype;

    p.update = function(dt)
    {
        var itr = this.bones_moving.head;
        while(itr !== null)
        {
            itr.obj.update(dt);
            if(itr.obj.done) this.bones_moving.remove(itr.obj);
            itr = itr.next;
        }
    };

    p.start_animation = function()
    {
        var anim_bone, bone_name;

        var initial_quaternions = {};
        var target_quaternions = {};

        // rotate bones to target location and update skeleton
        // keeping a copy of the initial state
        for(bone_name in this.start_location)
        {
            var target_bone = this.model.get_bone(bone_name);
            var target_location = this.start_location[bone_name];
            initial_quaternions[bone_name] = target_bone.quaternion.clone();
            target_bone.quaternion.copy(target_location);
        }
        this.parent.scene.updateMatrixWorld(true);
        this.model.skeleton.update();
        
        for(bone_name in this.start_orientation)
        {
            // at target location, calculate the local quaternion for the target global orientation
            // and store it for later interpolation
            var global_orientation = 
                new THREE.Quaternion().copy(this.start_orientation[bone_name]);
            var parent_global = 
                this.model.get_bone(bone_name).parent.getWorldQuaternion().clone();
            var target_orientation = 
                new THREE.Quaternion().multiplyQuaternions(parent_global.inverse(), global_orientation);

            // compose with target location for this bone in case it exists
            if(this.start_location[bone_name] !== undefined)
            {
                target_orientation = new THREE.Quaternion().multiplyQuaternions(
                    loc_bone, new THREE.Quaternion().copy(this.start_location[bone_name]));
            }
            target_quaternions[bone_name] = target_orientation;
        }

        // rollback changes to the skeleton
        for(bone_name in initial_quaternions)
        {
            this.model.get_bone(bone_name).quaternion.copy(initial_quaternions[bone_name]);
        }
        this.parent.scene.updateMatrixWorld(true);
        this.model.skeleton.update();

        // apply now calculated local orientation quaternions
        for(bone_name in target_quaternions)
        {
            anim_bone = this.parent.get_animated_bone(bone_name);
            if(anim_bone.done)
            {
                this.bones_moving.add(anim_bone);
                anim_bone.animate_to(target_quaternions[bone_name].x, target_quaternions[bone_name].y,
                        target_quaternions[bone_name].z, target_quaternions[bone_name].w, 1.5);
            }
        }

        // apply location quaternions
        for(bone_name in this.start_location)
        {
            anim_bone = this.parent.get_animated_bone(bone_name);
            if(anim_bone.done)
            {
                this.bones_moving.add(anim_bone); 
                anim_bone.animate_to(this.start_location[bone_name].x, this.start_location[bone_name].y,
                        this.start_location[bone_name].z, this.start_location[bone_name].w, 1.5);
            } 
        }
        
        // apply shape quaternions
        for(bone_name in this.shape)
        {
            anim_bone = this.parent.get_animated_bone(bone_name);
            if(anim_bone.done)
            {
                this.bones_moving.add(anim_bone); 
                anim_bone.animate_to(this.shape[bone_name].x, this.shape[bone_name].y,
                        this.shape[bone_name].z, this.shape[bone_name].w, 1.5);
            } 
        }
    };

    vj2.Sign = Sign;
}());
