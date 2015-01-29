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

    p.update_finger = function(finger,phalange,roll,yaw,pitch){
        switch(finger){
            case "THUMB":
                this.thumb.update_phalange(phalange,roll,yaw,pitch);
                break;
            case "INDEX":
                this.index.update_phalange(phalange,roll,yaw,pitch);
                break;
            case "MIDDLE":
                this.middle.update_phalange(phalange,roll,yaw,pitch);
                break;
            case "RING":
                this.ring.update_phalange(phalange,roll,yaw,pitch);
                break;
            case "PINKY":
                this.pinky.update_phalange(phalange,roll,yaw,pitch);
                break;
        }
    };

    p.update = function(dt){
        this.list_fingers.forEach(function(finger){
            finger.update(dt);
        });
    };

    vj2.Hand = Hand;
}());
