import styled from "styled-components";

const Container = styled.div`
  background-color: rgb(18, 18, 18);
  color: white;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
  font-weight: 500;
  border-bottom: 1px solid rgb(31,31,31);

`;

export default function Announcement() {
  return <Container>What is Done in Love is Done Well ❤️</Container>;
}
