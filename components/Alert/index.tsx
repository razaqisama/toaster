import React from 'react';
import { Id, ToastVariant } from '../Toast/types';
import { Container } from './style';

export interface AlertProps {
  id?: Id
  title: string;
  variant?: ToastVariant
}


function Alert({title, variant = 'success'}: AlertProps) {
  return (
    <Container variant={variant}>{title}</Container>
  )
}

export default Alert;