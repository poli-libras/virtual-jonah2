this.vj2 = this.vj2||{};

(function () {
    "use strict";

    function Finger(phalange1,phalange2,phalange3,direction){
        this.phalange1 = new vj2.Animated_bone(phalange1);
        this.phalange2 = new vj2.Animated_bone(phalange2);
        this.phalange3 = new vj2.Animated_bone(phalange3);
        this.phalange_list = [this.phalange1,this.phalange2,this.phalange3];
        this.direction = direction;
    }

    var p = Finger.prototype;

    p.update_phalange = function(phalange,roll,yaw,pitch){
        switch(phalange){
            case 1:
                this.phalange1.euler_animate_to(roll,yaw,pitch,0.1);
                break;
            case 2:
                this.phalange2.euler_animate_to(roll,yaw,pitch,0.1);
                break;
            case 3:
                this.phalange3.euler_animate_to(roll,yaw,pitch,0.1);
                break;
        }
    };

    p.update = function(dt){
        this.phalange_list.forEach(function(phalange){
            phalange.update(dt);
        });
    };

    vj2.Finger = Finger;
}());
