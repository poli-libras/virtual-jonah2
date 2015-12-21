this.vj2 = this.vj2||{};

(function () {
    "use strict";
    
    function Sign(parent, model, symbols)
    {
        this.parent = parent;
        this.model = model;
        this.symbols = symbols;

        this.symbolIdx = 0;
        if (symbols.length > 0) {
            this.next_location = symbols[this.symbolIdx].location;
            this.next_orientation = symbols[this.symbolIdx].orientation;
            this.next_shape = symbols[this.symbolIdx].shape;
        }
        this.bones_moving = [];
    }

    var p = Sign.prototype;

    p.update = function(dt) {
        if (this.bones_moving.length > 0) {
            this.bones_moving.forEach(function (animated_bone, index, array) {
                if (!animated_bone.done) {
                    animated_bone.update(dt);
                } else {
                    array.splice(index, 1); // remove bone from array
                }
            });
        } else { // Fim de uma etapa do movimento
            if (this.updateNextSymbol()) {
                console.log("Symbol " + this.symbolIdx);
                this.apply_orientation_quartenions();
                this.apply_location_quartenions();
                this.apply_shape_quartenions();
            }
        }
    };

    /**
     * Prepara o sinal para o próximo simbolo.
     * @returns {boolean} true se existe próximo símbolo; falso caso contrário.
     */
    p.updateNextSymbol = function()
    {
        if (this.symbolIdx < this.symbols.length - 1) { // Se tem mais etapas do movimento
            this.symbolIdx++;
            this.next_location = this.symbols[this.symbolIdx].location;
            this.next_orientation = this.symbols[this.symbolIdx].orientation;
            this.next_shape = this.symbols[this.symbolIdx].shape;
            return true;
        }
        return false;
    }

    p.start_animation = function()
    {
        this.bones_moving = [];
        this.symbolIdx = 0;
        this.next_location = this.symbols[this.symbolIdx].location;
        this.next_orientation = this.symbols[this.symbolIdx].orientation;
        this.next_shape = this.symbols[this.symbolIdx].shape;
        this.apply_orientation_quartenions();
        this.apply_location_quartenions();
        this.apply_shape_quartenions();
    };

    p.apply_orientation_quartenions = function() {
        var initial_quaternions = {};
        var target_quaternions = {};
        var bone_name;

        // rotate bones to target location and update skeleton
        // keeping a copy of the initial state
        for(bone_name in this.next_location)
        {
            var target_bone = this.model.get_bone(bone_name);
            var target_location = this.next_location[bone_name];
            initial_quaternions[bone_name] = target_bone.quaternion.clone();
            target_bone.quaternion.copy(target_location);
        }
        this.parent.scene.updateMatrixWorld(true);
        this.model.skeleton.update();
        
        for(bone_name in this.next_orientation)
        {
            // at target location, calculate the local quaternion for the target global orientation
            // and store it for later interpolation
            var global_orientation = 
                new THREE.Quaternion().copy(this.next_orientation[bone_name]);
            var parent_global =
                this.model.get_bone(bone_name).parent.getWorldQuaternion().clone();
            var target_orientation = 
                new THREE.Quaternion().multiplyQuaternions(parent_global.inverse(), global_orientation);

            // compose with target location for this bone in case it exists in location too
            if(this.next_location[bone_name] !== undefined)
            {
                target_orientation = new THREE.Quaternion().multiplyQuaternions(
                    target_orientation, new THREE.Quaternion().copy(this.next_location[bone_name]));
            }
            target_quaternions[bone_name] = target_orientation;
        }

        // rollback changes to the skeleton (we had gone to the target only to calculate the target_orientation)
        for(bone_name in initial_quaternions)
        {
            this.model.get_bone(bone_name).quaternion.copy(initial_quaternions[bone_name]);
        }
        this.parent.scene.updateMatrixWorld(true);
        this.model.skeleton.update();

        // apply now calculated local orientation quaternions
        for(bone_name in target_quaternions)
        {
            var anim_bone = this.parent.get_animated_bone(bone_name);
            if(anim_bone.done)
            {
                this.bones_moving.push(anim_bone);
                anim_bone.animate_to(target_quaternions[bone_name].x, target_quaternions[bone_name].y,
                        target_quaternions[bone_name].z, target_quaternions[bone_name].w, 1.5);
            }
        }
    };

    p.apply_location_quartenions = function() {
        for(var bone_name in this.next_location)
        {
            var anim_bone = this.parent.get_animated_bone(bone_name);
            if(anim_bone.done)
            {
                this.bones_moving.push(anim_bone); 
                anim_bone.animate_to(this.next_location[bone_name].x, this.next_location[bone_name].y,
                        this.next_location[bone_name].z, this.next_location[bone_name].w, 1.5);
            } 
        }
    };

    p.apply_shape_quartenions = function() {
        for(var bone_name in this.next_shape)
        {
            var anim_bone = this.parent.get_animated_bone(bone_name);
            if(anim_bone.done)
            {
                this.bones_moving.push(anim_bone); 
                anim_bone.animate_to(this.next_shape[bone_name].x, this.next_shape[bone_name].y,
                        this.next_shape[bone_name].z, this.next_shape[bone_name].w, 1.5);
            } 
        }
    };

    vj2.Sign = Sign;
}());
