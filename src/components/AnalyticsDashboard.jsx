import React from 'react';
import SummaryOutputCard from './SummaryOutputCard';
import KeywordCloudGrid from './KeywordCloudGrid';

export default function AnalyticsDashboard() {
  return (
    <div className="flex flex-col h-full gap-6 lg:gap-8">
      <SummaryOutputCard />
      <KeywordCloudGrid />
    </div>
  );
}
