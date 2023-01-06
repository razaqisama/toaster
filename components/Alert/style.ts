import styled from '@emotion/styled';
import { variant } from 'styled-system';
import { ToastVariant } from '../Toast/types';

interface WrapperProps {
  variant: ToastVariant
}

const wrapperVariantType = variant({
    prop: 'variant',
    variants: {
      success: {
        background: "green",
      },
      error: {
        background: "red",
      },
      info: {
        background: "blue",
      },
      warning: {
        background: "yellow",
      },
    },
  });

export const Container = styled.div<WrapperProps>`
  ${wrapperVariantType}
  padding: 8px;
`