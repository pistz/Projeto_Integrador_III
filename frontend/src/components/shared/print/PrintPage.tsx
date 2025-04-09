import { Divider } from 'antd';
import React, { useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import styled from 'styled-components';
import { loadSystemVersion } from '../../../config/loadEnv';

const SYSTEM_VERSION = loadSystemVersion();

interface PrintPageProps<T> {
  title: string;
  headers: string[];
  tableData: T[];
  rowMapper: (item: T, index: number) => React.ReactNode[];
  triggerRef: React.MutableRefObject<(() => void) | null>;
}

const Hidden = styled.div`
  position: absolute;
  top: -9999px;
  left: -9999px;
`;

const Container = styled.div`
  padding: 24px;
  font-family: 'Roboto', sans-serif;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border: 1px solid #000;
  padding: 8px;
  text-align: left;
  background-color: #eee;
`;

const Td = styled.td`
  border: 1px solid #000;
  padding: 8px;
  text-align: left;
`;

const Footer = styled.footer`
  text-align: center;
  font-size: 0.9rem;
  margin-top: 48px;
  color: #555;
`;

export function PrintPage<T>({
  title,
  headers,
  tableData,
  rowMapper,
  triggerRef,
}: PrintPageProps<T>) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: title,
  });

  useEffect(() => {
    if (triggerRef) {
      triggerRef.current = handlePrint;
    }
  }, [handlePrint, triggerRef]);

  return (
    <Hidden>
      <Container ref={printRef}>
        <Divider style={{ fontSize: 35 }}>{title}</Divider>
        <Table>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <Th key={index}>{header}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index}>
                {rowMapper(item, index).map((cell, idx) => (
                  <Td key={idx}>{cell}</Td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
        <Footer>{SYSTEM_VERSION}</Footer>
      </Container>
    </Hidden>
  );
}
