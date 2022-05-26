import styled from "@emotion/styled";
import { Image } from "@chakra-ui/react";

type Props = {
  hasTransition?: boolean;
};
export const TransitionImage = styled(Image)<Props>`
  border-radius: 10px;
  background-size: contain;
  cursor: pointer;
  background-repeat: no-repeat;

  animation-duration: 0.5s;
  animation-name: ${(props) => (props.hasTransition ? "rotate" : "")};
  animation-iteration-count: infinite;
  animation-direction: alternate;

  :hover {
    transform: rotate(-3deg);
  }

  @keyframes rotate {
    from {
      transform: rotate(10deg);
    }

    to {
      transform: skew(0deg);
    }
  }
`;
