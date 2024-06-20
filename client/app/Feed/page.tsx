import React from 'react';
import dynamic from 'next/dynamic';

const FeedContent = dynamic(() => import('../components/FeedContent'), { ssr: false });

const Feed: React.FC = () => {
  return <FeedContent />;
};

export default Feed;
