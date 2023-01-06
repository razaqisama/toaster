import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const Wrapper = styled.div`
  width: 800px;
  display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
`

export const Button = styled.button`
  width: max-content;
  margin: 0;
  padding: 8px 16px;
`