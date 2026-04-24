import React from "react";
import { FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";
import {
  FullPageWrap,
  StatusCard,
  StatusIconWrap,
  StatusCode,
  StatusHeading,
  StatusDesc,
  StatusBackBtn,
  StatusDivider,
  StatusHint,
} from "../styles/statusPage_style";

const ErrorPage = () => {
  return (
    <FullPageWrap>
      <StatusCard>
        <StatusCode $color="#EF4444">404</StatusCode>

        <StatusIconWrap $bg="#FEF2F2" $color="#EF4444" $border="#FECACA">
          <FaExclamationTriangle />
        </StatusIconWrap>

        <StatusHeading>Page not found</StatusHeading>
        <StatusDesc>
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
          Please check the URL or head back to the login page.
        </StatusDesc>

        <StatusBackBtn to="/" $bg="#EF4444">
          <FaArrowLeft /> Back to login
        </StatusBackBtn>

        <StatusDivider />
        <StatusHint>Error code 404 &mdash; Resource not found</StatusHint>
      </StatusCard>
    </FullPageWrap>
  );
};

export default ErrorPage;
