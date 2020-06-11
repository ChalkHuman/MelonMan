class TileResolver {
    constructor (matrix, tileSize = 16) {
        this.matrix = matrix
        this.tileSize = tileSize;
    }
    toIndex (pos) {
        return Math.floor (pos / this.tileSize);
    }
    getByIndex (indexX, indexY) {
        const tile = this.matrix.get (indexX, indexY);
        if (tile) {
            return {
                tile
            };
        }
    }
    matchByPosition (posX, posY) {
        return this.getByIndex (
            this.toIndex (posX),
            this.toIndex (posY)
        );
    }
}

export default class TileCollider {
    constructor (tiles) {
        this.tiles = tiles;
    }
    test (entity) {
        //console.log ("Testing", entity);
    }
}