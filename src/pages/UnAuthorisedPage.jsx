import React from "react";
import { FaLock, FaArrowLeft } from "react-icons/fa";
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

export const UnAuthorisedPage = () => {
  return (
    <FullPageWrap>
      <StatusCard>
        <StatusCode $color="#8B5CF6">403</StatusCode>

        <StatusIconWrap $bg="#F5F3FF" $color="#8B5CF6" $border="#DDD6FE">
          <FaLock />
        </StatusIconWrap>

        <StatusHeading>Access denied</StatusHeading>
        <StatusDesc>
          You don&rsquo;t have permission to view this page. Please contact your
          administrator if you believe this is a mistake.
        </StatusDesc>

        <StatusBackBtn to="/user-dashboard" $bg="#8B5CF6">
          <FaArrowLeft /> Back to home
        </StatusBackBtn>

        <StatusDivider />
        <StatusHint>Error code 403 &mdash; Forbidden</StatusHint>
      </StatusCard>
    </FullPageWrap>
  );
};
