export class Player {
    constructor(score, health, timeMoved, size, position, fromPosition, toPosition, delayMove, images, direction, damage, inventory, weapon, ammo) {
        this.score = score;
        this.health = health; 
        this.timeMoved = timeMoved; 
        this.size = size; 
        this.position = position;
        this.fromPosition = fromPosition; 
        this.toPosition = toPosition; 
        this.delayMove = delayMove; 
        this.images = images;
        this.direction = direction; 
        this.damage = damage; 
        this.inventory = inventory;
        this.weapon = weapon;
        this.ammo = ammo;
    }

    move(x, y) { 
        this.fromPosition = [x, y]; // Update the starting position
        this.toPosition = [x, y]; // Update the target position
        this.position = [((40 * x) + ((40 - this.size[0]) / 2)), ((40 * y) + ((40 - this.size[1]) / 2))]; //Set the player's position and times by 40 to convert it to pixel posiiton
    }

    updatePosition(time) { 
        if (this.fromPosition[0] == this.toPosition[0] && this.fromPosition[1] == this.toPosition[1]) { //If the player is where they need to be
            return false; //Player can move
        } 

        if ((time - this.timeMoved) >= this.delayMove) { //If enough time has passed to let the player move
            this.move(this.toPosition[0], this.toPosition[1]); //Move the player
        } else { //Calculate the position while player is moving
            this.position[0] = (this.fromPosition[0] * 40) + ((40 - this.size[0]) / 2);
            this.position[1] = (this.fromPosition[1] * 40) + ((40 - this.size[1]) / 2);

            if (this.toPosition[0] != this.fromPosition[0]) { //Calculate X coordinate
                let distance = (40 / this.delayMove) * (time - this.timeMoved);
                if (this.toPosition[0] < this.fromPosition[0]) {
                    this.position[0] -= distance;
                } else {
                    this.position[0] += distance;
                }
            }
            
            if (this.toPosition[1] != this.fromPosition[1]) { //Calculate Y coordinate
                let distance = (40 / this.delayMove) * (time - this.timeMoved);
                if (this.toPosition[1] < this.fromPosition[1]) {
                    this.position[1] -= distance;
                } else {
                    this.position[1] += distance;
                }
            } 
            
            this.position[0] = Math.round(this.position[0]); //Round the coordinates to a full number
            this.position[1] = Math.round(this.position[1]);
        }
        return true; //Player can't move
    }
}
