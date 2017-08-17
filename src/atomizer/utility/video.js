import React from 'react';

const httpre = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/
const vidext = ["mp4", "ogg", "webm"];

export default {
  name: "video",

  classifier(name, data) {
    if(typeof data !== "string") return 0.0;

    if(!httpre.exec(data)) return 0.0;

    const ext = data.split(".").pop();
    return (vidext.includes(ext)) ? 1.0: 0.0;
  },
  renderer(name, data, styleMap) {
    const ext = data.split(".").pop();
    return (
      <video className={`${name} ${styleMap.atom}`} width="640" height="480">
        <source src={data} type={`video/${ext}`} />
      </video>
    )
  },

}
