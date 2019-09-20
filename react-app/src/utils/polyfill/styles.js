/**
  * css3 样式兼容
  * @param ie 是否要兼容 ie10 以下，默认 false
  */
HTMLElement.prototype.setStyle = function(key, value, ie = false) {
  try {
    let wkey = key.substr(0, 1).toUpperCase() + key.substr(1);
    this.style[`o${wkey}`] = value;
    this.style[`webkit${wkey}`] = value;
    this.style[`Moz${wkey}`] = value;
    if (ie) this.style[`ms${wkey}`] = value;
    this.style[key] = value;
  } catch (e) {}
};
