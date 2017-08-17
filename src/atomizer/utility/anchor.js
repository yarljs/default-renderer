import React from 'react';

const httpre = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/

export default {
  name: "anchor",
  after: [
    "image",
    "video"
  ],
  classifier(name, data) {
    if(typeof data !== "string") return 0.0;

    if(!httpre.exec(data)) return 0.0;
    
    return 1.0;
  },
  renderer(name, data, styleMap) {
    return <a className={`${name} ${styleMap.atom}`} href={data}>{name}</a>
  },

}
