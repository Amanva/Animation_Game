class BoundingBox {
    constructor(x, y, width, height) {
        Object.assign(this, { x, y, width, height });

        this.left = x;
        this.top = y;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
    };

    collide(oth) {
        if (this.right > oth.left && this.left < oth.right && this.top < oth.bottom && this.bottom > oth.top) return true;
        return false;
    };

    /** 
     * @method distance() checks distance between entities.
     * If positive then other on the left side, negative means right.
     * @return distance between the entities
     * @author Uladzimir Hanevich
    */
    distance(oth) {
        // console.log(this, oth);
        //  console.log(Math.round((this.left + this.width/2) - (oth.left + oth.width/2)));
        //  console.log(this);
        //  console.log("botLeft: " + this.left + " bot width/2: " + this.width/2);
        //  console.log(oth);
        //  console.log("mageLeft: " + oth.left + " mage width/2: " + oth.width/2 );
        //  console.log("distance mage bot: ");
        //  console.log(Math.round((this.left + this.width/2) - (oth.left + oth.width/2)));
        return ((this.left + this.width/2) - (oth.left + oth.width/2));
    };

};