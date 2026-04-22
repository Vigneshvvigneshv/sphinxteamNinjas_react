import styled from "styled-components";

/* Page */
export const PageWrapper = styled.div`
  padding: 30px;
`;

/* Header */
export const PageHeader = styled.div`
  margin-bottom: 20px;
`;

export const HeaderLeft = styled.div``;

export const PageLabel = styled.div`
  font-size: 12px;
  color: green;
`;

export const PageSubtitle = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

/* Stats */
export const StatsRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

export const StatCard = styled.div`
  background: white;
  padding: 15px;
  border-radius: 10px;
`;

export const StatIcon = styled.div`
  font-size: 20px;
`;

export const StatInfo = styled.div`
  .val {
    font-size: 20px;
    font-weight: bold;
  }
`;

/* Toolbar */
export const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const SearchWrap = styled.div`
  position: relative;
`;

export const SearchInput = styled.input`
  padding: 8px 10px 8px 30px;
`;

export const ResultCount = styled.div`
  font-size: 14px;
`;

/* Panel */
export const Panel = styled.div`
  background: white;
  border-radius: 10px;
`;

export const PanelHeader = styled.div`
  padding: 10px;
  border-bottom: 1px solid #eee;
`;

export const PanelTitle = styled.div`
  font-weight: bold;
`;

export const PanelBadge = styled.div`
  font-size: 12px;
`;

/* List */
export const ListWrap = styled.div``;

export const RowCard = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid #eee;
`;

export const RowLeft = styled.div``;

export const RowTitle = styled.div`
  font-weight: bold;
`;

export const RowSub = styled.div`
  font-size: 12px;
  color: gray;
`;

/* Empty */
export const EmptyWrap = styled.div`
  text-align: center;
  padding: 40px;
`;

export const EmptyTitle = styled.div`
  font-size: 18px;
`;

export const EmptyDesc = styled.div`
  font-size: 14px;
  color: gray;
`;