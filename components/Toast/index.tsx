import React, { useEffect, useState } from 'react';
import { Id } from './types';
import { ToastPosition, ToastProps } from './types';
import { eventManager, ToastEvent } from './core/eventManager';
import { ToastContainer } from './styles';
import ReactPortal from '../Portal';
import Alert from '../Alert';

function Toast() {
  const [toastList, setToastList] = useState<ToastProps[]>([]);
  const appendToast = (content: ToastProps) => {
    setToastList((state) =>[...state, content]);
  };

  const removeToast = (id: Id | undefined) => {
    setToastList((state) => {
      const temp = [...state];
      const index = temp.findIndex((item) => {
        return id === item.id;
      });

      if (index !== -1) {
        temp.splice(index, 1);
      }
      return temp;
    });
  };

  useEffect(() => {
    eventManager
      .on(ToastEvent.APPEND, (content) => {
        appendToast(content);
      })
      .on(ToastEvent.REMOVE, (id) => {
        removeToast(id);
      })
      .emit(ToastEvent.MOUNT);

    return () => {
      eventManager.emit(ToastEvent.UNMOUNT);
      setToastList([]);
    };
  }, []);

  useEffect(() => {
    const now = Date.now();
    const timeouts = toastList.map((t: ToastProps) => {
      if (!t.autoClose) {
        return false;
      }
      const timeToLife = now - (t.createdAt || 0);
      const durationLeft = (t.autoClose || 0) - timeToLife;

      return setTimeout(() => {
        removeToast(t.id);
      }, durationLeft);
    });

    return () => {
      timeouts.forEach((timeout) => {
        if (timeout) {
          clearTimeout(timeout);
        }
      });
    };
  }, [toastList]);

  function getToastToRender<T>(
    cb: (position: ToastPosition, toastList: ToastProps[]) => T,
  ) {
    const toRender = new Map<ToastPosition, ToastProps[]>();
    toastList.forEach((toast) => {
      const { position } = toast;
      if (position) {
        if (!toRender.has(position)) {
          toRender.set(position, []);
        }
        toRender.get(position)?.push(toast);
      }
    });
    return Array.from(toRender, (p) => cb(p[0], p[1]));
  }

  return (
    <div id="toast-provider">
      {getToastToRender((position, list) => {
        return (
          <ReactPortal
            key={`toast-${position}`}
            wrapperId={`toast-${position}`}
          >
            <ToastContainer
              positionVariant={position}
              id={`toast-${position}-container`}
            >
              {list.map((item) => {
                const { title, id, variant } = item;
                return (
                  <Alert
                    key={`toast-${id}`}
                    title={title}
                    id={id}
                    variant={variant}
                  />
                );
              })}
            </ToastContainer>
          </ReactPortal>
        );
      })}
    </div>
  );
}

export default Toast;
