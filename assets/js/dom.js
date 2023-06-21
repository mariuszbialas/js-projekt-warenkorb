'use strict';

const dom = {
  create(content, type, parent, className, id) {
    const container = document.createElement(type);
    container.innerHTML = content || '';
    if (className) container.classList.add(className);
    if(id) container.setAttribute('data-id', id);
    parent.append(container);

    return container;
  },

  sel(selector) {
    return document.querySelector(selector);
  },

  selAll(selector) {
    return [...document.querySelectorAll(selector)];
  },
};

