import React from 'react';

interface Props {
  title: string;
  component: React.ReactNode;
  boldFont?: boolean;
  fontColor?: string;
}
export const CardComponent: React.FC<Props> = ({
  title,
  component,
  boldFont,
  fontColor,
}: Props) => {
  return (
    <>
      {component}
      <p style={{ fontWeight: boldFont ? 'bolder' : '', color: fontColor }}>
        {title}
      </p>
    </>
  );
};
