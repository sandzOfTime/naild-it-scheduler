/*eslint no-extend-native: ["error", { "exceptions": ["String"] }]*/

declare global { 
  interface String {
    capitalize(): string;
  }
}

String.prototype.capitalize = function()  {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

export {}

