this.vj2 = this.vj2||{};

(function () {
    "use strict";

    function Action_upper_limbs(human_model, scene){

        this.human_model = human_model;
        this.scene = scene;

        this.signs = {};
        this.sign = null;

        this.done = 0;
        this.locations = null;
        this.orientations = null;
        this.shapes = null;
        this.signConfig = null;

        var self = this;
        (new vj2.Limb_config_loader()).load('../resources/locations.json', 
                function (config) {self.locations = config; self.done++;});
        (new vj2.Limb_config_loader()).load('../resources/orientations.json', 
                function (config) {self.orientations = config; self.done++;});
        (new vj2.Limb_config_loader()).load('../resources/shapes.json', 
                function (config) {self.shapes = config; self.done++;});
        (new vj2.Sign_config_loader()).load('../resources/signs.json',
                function(config) {self.signConfig = config; self.done++;});

        this.init();
    }

    var p = Action_upper_limbs.prototype;

    p.init = function() {

        // Wait until all files are loaded
        if (this.done < 4) {
            setTimeout($.proxy(this.init, this), 10); // proxy calls init using 'this' as its context
            return;
        }

        for(var sign_name in this.signConfig)
        {
            var sign = this.signConfig[sign_name];
            var symbols = [];
            var limb = (sign.left_hand_resting) ? 'right' : 'both';
            for (var i = 0; i < sign.symbols.length; i++) {
                var symbolConfig = sign.symbols[i];
                var loc = this.locations.get_config(symbolConfig.location, limb);
                var or = this.orientations.get_config(symbolConfig.orientation, limb);
                var sp = this.shapes.get_config(symbolConfig.shape, limb);
                symbols.push(new vj2.Symbol(loc, or, sp));
            }
            this.signs[sign_name] = new vj2.Sign(this, this.human_model, symbols);
        }
    };

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

    // Trace quaternion in JSON format
    p.trace_quaternion = function(label){
        var g = this.human_model.get_bone(label).getWorldQuaternion();
        console.log("Global - \"" + label + "\":{ \"x\": " + g.x + ", \"y\": " + g.y + ", \"z\": " + g.z + ", \"w\": " + g.w + "}");

        var q = this.human_model.get_bone(label).quaternion;
        console.log("Local  - \"" + label + "\":{ \"x\": " + q.x + ", \"y\": " + q.y + ", \"z\": " + q.z + ", \"w\": " + q.w + "}");
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
        if(this.sign !== undefined && this.sign !== null)
        {
            this.sign.update(dt);
        }
    };

    // TODO trocar por "increment_bone_euler" 
    p.set_bone_euler = function(bone_name, x, y, z){
        var anim_bone = this.get_animated_bone(bone_name);
        anim_bone.euler_increment(x, y, z);
    };

    p.set_sign = function(sign_name){
        this.sign = this.signs[sign_name];
        this.sign.start_animation();
    };

    p.get_sign = function(sign_name){
        return this.signs[sign_name];
    }

    vj2.Action_upper_limbs = Action_upper_limbs;
}());
