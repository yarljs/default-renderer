import React from 'react';

const httpre = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/
const imgext = ["jpg", "jpeg", "svg", "gif", "png"];

export default {
  name: "image",

  classifier(name, data) {
    if(typeof data !== "string") return 0.0;

    if(!httpre.exec(data)) return 0.0;

    const ext = data.split(".").pop();
    return (imgext.includes(ext)) ? 1.0: 0.0;
  },
  renderer(name, data, styleMap) {
    return <img className={`${name} ${styleMap.atom}`} src={data} alt={name} />
  },

}
