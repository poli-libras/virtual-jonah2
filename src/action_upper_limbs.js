this.vj2 = this.vj2||{};

(function () {
    "use strict";

    function Action_upper_limbs(human_model, scene){
        this.human_model = human_model;
        this.scene = scene;

        this.signs = {};
        this.sign = null;
        
        var self = this;
        (new vj2.Limb_config_loader()).load('../resources/locations.json', 
                function (config) {self.locations = config;});
        (new vj2.Limb_config_loader()).load('../resources/orientations.json', 
                function (config) {self.orientations = config;});
        (new vj2.Limb_config_loader()).load('../resources/shapes.json', 
                function (config) {self.shapes = config;});

        // Can be problematic if the other config files are not loaded before this one is
        (new vj2.Sign_config_loader()).load('../resources/signs.json', function (config) {
            console.log(config);
            for(var sign_name in config)
            {
                var sign = config[sign_name];
                var limb = (sign.left_hand_resting) ? 'right' : 'both';
                var loc = self.locations.get_config(sign.start_location, limb);
                var or = self.orientations.get_config(sign.start_orientation, limb);
                var sp = self.shapes.get_config(sign.shape, limb);
                self.signs[sign_name] = new vj2.Sign(self, self.human_model, loc, or, sp);
            }
        });
    }

    var p = Action_upper_limbs.prototype;

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
        var g = this.human_model.get_bone(label).getWorldQuaternion();
        console.log(label + " - GLOBAL: (" + g.x + ", " + g.y + ", " + g.z + ", " + g.w + ")");

        var q = this.human_model.get_bone(label).quaternion;
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
            anim_bone.set(0, 0, 0, 1);
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
            this.animated_bone_pool[name] = new vj2.Animated_bone(this.human_model, name);
        return this.animated_bone_pool[name];
    };

    p.update = function(dt){
        if(this.sign !== null)
        {
            this.sign.update(dt);
        }
    };

    p.set_bone_euler = function(bone_name, x, y, z){
        var anim_bone = this.get_animated_bone(bone_name);
        anim_bone.euler_increment(x, y, z);
    };

    p.set_sign = function(sign){
        this.sign = this.signs[sign];
        this.sign.start_animation();
    };

    vj2.Action_upper_limbs = Action_upper_limbs;
}());
