import styled from '@emotion/styled';
import { variant } from 'styled-system';
import { ToastContainerProps } from './types';

const positionVariant = variant({
  prop: 'positionVariant',
  variants: {
    topLeft: {
      top: 0,
      left: 0,
    },
    topRight: {
      top: 0,
      right: 0,
      alignItems: 'end',
    },
    topCenter: {
      top: 0,
      left: '42%',
    },
    bottomLeft: {
      bottom: 0,
      left: 0,
    },
    bottomRight: {
      bottom: 0,
      right: 0,
      alignItems: 'end',
    },
    bottomCenter: {
      bottom: 0,
      left: '42%',
    },
  },
});

export const ToastContainer = styled.div<ToastContainerProps>`
  margin: 4px;
  position: fixed;
  ${positionVariant}
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
