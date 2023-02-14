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
     * @param oth other bounding box
     * @return distance between the entities
     * @author Uladzimir Hanevich
    */
    distance(oth) {
        return ((this.left + this.width/2) - (oth.left + oth.width/2));
    };
};