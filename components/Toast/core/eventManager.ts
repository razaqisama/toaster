import { ToastProps } from '../types';
import { Id } from '../types';

export const enum ToastEvent {
  APPEND,
  REMOVE,
  MOUNT,
  UNMOUNT,
}

export type EventArgument = ToastProps & Id;

type OnShowCallback = (content: ToastProps) => void;
type OnRemoveCallback = (id: Id) => void;
type OnMountCallback = () => void;
type OnUnmountCallback = () => void;

type Callback = OnShowCallback | OnRemoveCallback | OnUnmountCallback;

export interface ToastEventManager {
  list: Map<ToastEvent, Callback[]>;
  on(event: ToastEvent.APPEND, callback: OnShowCallback): ToastEventManager;
  on(event: ToastEvent.REMOVE, callback: OnRemoveCallback): ToastEventManager;
  on(event: ToastEvent.MOUNT, callback: OnMountCallback): ToastEventManager;
  on(event: ToastEvent.UNMOUNT, callback: OnUnmountCallback): ToastEventManager;
  off(event: ToastEvent, callback?: Callback): ToastEventManager;
  emit(event: ToastEvent.APPEND, content: ToastProps): void;
  emit(event: ToastEvent.REMOVE, id: Id): void;
  emit(event: ToastEvent.MOUNT, content?: ToastProps): void;
  emit(event: ToastEvent.UNMOUNT, content?: ToastProps): void;
}

export const eventManager: ToastEventManager = {
  list: new Map(),
  on(event: ToastEvent, callback: Callback) {
    if (!this.list.has(event)) {
      this.list.set(event, []);
    }
    this.list.get(event)?.push(callback);
    return this;
  },
  off(event: ToastEvent, callback: Callback) {
    if (callback) {
      const cb = this.list
        .get(event)
        ?.filter((eventCallback) => eventCallback !== callback);
      if (cb) {
        this.list.set(event, cb);
      }
      return this;
    }
    return this;
  },
  emit(event: ToastEvent, args: EventArgument) {
    if (this.list.has(event)) {
      this.list.get(event)?.forEach((callback: Callback) => {
        setTimeout(() => {
          callback(args);
        }, 0);
      });
    }
  },
};
