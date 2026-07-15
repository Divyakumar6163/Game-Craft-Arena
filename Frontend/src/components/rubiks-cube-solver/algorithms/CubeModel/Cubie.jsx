import Face from "./Face";

export default class Cubie {
  constructor({
    id,

    type,

    position,

    homePosition,

    colors,
  }) {
    this.id = id;

    this.type = type;

    this.position = [...position];

    this.homePosition = [...homePosition];

    this.faces = {
      xPositive: new Face(colors.xPositive),

      xNegative: new Face(colors.xNegative),

      yPositive: new Face(colors.yPositive),

      yNegative: new Face(colors.yNegative),

      zPositive: new Face(colors.zPositive),

      zNegative: new Face(colors.zNegative),
    };
  }

  clone() {
    return new Cubie({
      id: this.id,

      type: this.type,

      position: this.position,

      homePosition: this.homePosition,

      colors: {
        xPositive: this.faces.xPositive.color,

        xNegative: this.faces.xNegative.color,

        yPositive: this.faces.yPositive.color,

        yNegative: this.faces.yNegative.color,

        zPositive: this.faces.zPositive.color,

        zNegative: this.faces.zNegative.color,
      },
    });
  }
}
