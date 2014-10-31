this.vj2 = this.vj2||{};

(function () {
    "use strict";

    function List() {
        this.head = null;
        this.tail = null;
    }

    var p = List.prototype;

    p.add = function(e) {
        if(this.head === null)
        {
            this.head = { obj : e, next : null };
            this.tail = this.head;
        }
        else
        {
            this.tail.next = { obj : e, next : null };            
            this.tail = this.tail.next;
        }
    };

    p.remove = function(e) {
        if(this.head.obj === e)
        {
            this.head = this.head.next;
        }
        else
        {
            var itr = this.head;
            while(itr.next !== null)
            {
                if(itr.next.obj === e)
                {
                    itr.next = itr.next.next;
                    break;
                }
                itr = itr.next;
            }
        }
    };

    vj2.List = List;
}());
