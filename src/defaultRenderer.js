import defaultStyleMap from './styleMap';
import React from 'react';
import {test} from './atomizer';

function renderAtom(name, data, styleMap) {
  return test(name,data)(name, data, styleMap)
}

function renderObject(name, data, styleMap) {

  const object = Object.keys(data).map((e, i) => {
    return (
      <div key={i} className={`${name} ${styleMap.member} ${e}`}>
        <span className={`${name} ${styleMap.label} ${e}`}>{e}</span>
        <div className={`${name} ${styleMap.value} ${e}`}>
          {defaultRenderer(e, data[e], styleMap)}
        </div>
      </div>
    )
  });
  return (
    <div className={`${name} ${styleMap.object}`}>
      {object}
    </div>
  )
}

function renderArray(name, data, styleMap) {
  const items = data.map((e, i) => {
    return (
      <div className={`${name} ${styleMap.item}`} key={i}>
        {defaultRenderer(name, e, styleMap)}
      </div>
    )
  })
  return (
    <div className={`${name} ${styleMap.list}`}>
      {items}
    </div>
  );

}


export default function defaultRenderer(name, data, styleMap=defaultStyleMap) {
  let body;
  if(data === null)
  {
    body = renderAtom(name, data, styleMap);
  }
  else if(Array.isArray(data))
  {
    body = renderArray(name, data, styleMap);
  }
  else if(typeof data === "object")
  {
    body = renderObject(name, data, styleMap);
  }
  else
  {
    body = renderAtom(name, data, styleMap);
  }

  return (
    <div className={`${name} ${styleMap.data} ${styleMap.container}`}>
      {body}
    </div>
  )
}
