import React from 'react';
import AtomGraph from './AtomGraph';

let Renderers = new AtomGraph();


function Atomizer(atomizer) {
  Renderers.addRenderer(atomizer);
}

function defaultRenderer(name, data, styleMap) {
  return (
    <span className={`${name} ${styleMap.atom}`}>
      {data || ""}
    </span>
  )
}

function test(name, data, threshhold=.5) {
  const srt = Renderers.getSorted();
  for (let s in srt)
  {
    if(srt[s].classifier(name, data) > threshhold)
    {
      return srt[s].renderer;
    }
  }
  return defaultRenderer;
}

export {
  defaultRenderer,
  Atomizer,
  test
}
