import { createPortal } from 'react-dom';
import { PortalProps } from './types';

const createPortalWrapper = (wrapperId: string) => {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
};

function ReactPortal({ children, wrapperId = 'portal' }: PortalProps) {
  let element = document.getElementById(wrapperId);
  if (!element) {
    element = createPortalWrapper(wrapperId);
  }
  return createPortal(children, element);
}

export default ReactPortal;
