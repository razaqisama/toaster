import { Id } from '../types';
import { ToastProps, ToastVariant } from '../types';
import { eventManager, ToastEvent } from './eventManager';
import { generateId } from '../../../utils/generateId';

function dispatchToast(content: ToastProps) {
  eventManager.emit(ToastEvent.APPEND, {
    id: generateId(),
    position: 'topRight',
    ...content,
    createdAt: Date.now(),
  });
}

function createToastByType(type: ToastVariant) {
  return (content: ToastProps) => dispatchToast({ variant: type, ...content });
}

function removeToast(id: Id) {
  eventManager.emit(ToastEvent.REMOVE, id);
}

function toast(content: ToastProps) {
  dispatchToast(content);
}

toast.close = (id: Id) => {
  removeToast(id);
};
toast.success = createToastByType('success');
toast.error = createToastByType('error');
toast.info = createToastByType('info');
toast.warning = createToastByType('warning');

eventManager.on(ToastEvent.UNMOUNT, () => {
  eventManager.off(ToastEvent.APPEND);
});

export { toast };
