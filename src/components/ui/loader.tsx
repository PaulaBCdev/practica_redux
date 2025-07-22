import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20em;
`;

const Loader = styled.div`
  display: inline-flex;
  gap: 5px;
  animation: l2-0 1s infinite linear;

  &:before,
  &:after {
    content: "";
    width: 35px;
    aspect-ratio: 1;
    box-shadow: 0 0 0 3px inset #131313;
    animation: l2-1 1s infinite linear both;
  }

  &:after {
    animation-direction: reverse;
  }

  @keyframes l2-0 {
    0% {
      transform: rotate(0deg);
    }

    80%,
    100% {
      transform: rotate(180deg);
    }
  }

  @keyframes l2-1 {
    0%,
    20% {
      border-radius: 0;
    }

    80%,
    100% {
      border-radius: 50%;
    }
  }
`;

Container.displayName = "Container";
Loader.displayName = "Loader";

export default function LoadingSpinner() {
  return (
    <Container>
      <Loader />
    </Container>
  );
}
