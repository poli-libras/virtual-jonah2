this.vj2 = this.vj2||{};

(function () {
    "use strict";

    function Hand(thumb, index, middle,ring,pinky,direction){
        this.thumb = thumb;
        this.index = index;
        this.middle = middle;
        this.ring = ring;
        this.pinky = pinky;
        this.direction = direction;
        this.list_fingers = [this.thumb,this.index,this.middle,this.ring,this.pinky];
    }

    var p = Hand.prototype;

    p.open = function(){
        this.list_fingers.forEach(function(finger){
            finger.open();
        });
    };

    p.close = function(){
        this.index.close(0.1,0);
        this.middle.close(0,0);
        this.ring.close(-0.1,0);
        this.pinky.close(-0.2,0);
    };

    p.rock = function(){
        var rotation_value = -3.14/2.5;
        this.index.close(0.1,rotation_value);
        this.middle.close(0,rotation_value);
        this.ring.close(-0.1,rotation_value);
        this.pinky.close(-0.2,rotation_value);
    };

    p.animation = function(dt){
        this.list_fingers.forEach(function(finger){
            finger.animation(dt);
        });
    };

    p.set_shape = function(shape){
        switch(shape)
        {
            case "MAO_FECHADA":
                this.close();
                break;
            case "MAO_ABERTA":
                this.open();
                break;
            case "PEDRA":
                this.rock();
        }
    };

    vj2.Hand = Hand;
}());
