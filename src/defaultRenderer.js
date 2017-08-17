import defaultStyleMap from './styleMap';
import React from 'react';
import {test} from './atomizer';

function renderAtom(name, data, styleMap) {
  return test(name,data)(name, data, styleMap)
}


function renderMember(name, data, styleMap, index) {
  return (
    <div key={index} className={`${name} ${styleMap.member} ${name}`}>
      <span className={`${name} ${styleMap.label} ${name}`}>{name}</span>
      <div className={`${name} ${styleMap.value} ${name}`}>
        {defaultRenderer(name, data, styleMap)}
      </div>
    </div>
  )
}
function renderObject(name, data, styleMap) {

  const object = Object.keys(data).map((e, i) => {
    return renderMember(e, data[e], styleMap, i);
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
      <li className={`${name} ${styleMap.item}`} key={i}>
        {defaultRenderer(name, e, styleMap)}
      </li>
    )
  })
  return (
    <ol className={`${name} ${styleMap.list}`}>
      {items}
    </ol>
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
