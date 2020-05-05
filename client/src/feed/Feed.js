import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { Card } from 'react-bootstrap';

const Feed = () => (
  <Card className="p-3 mt-3 text-center">
    <h1>Las Vegas Feed</h1>
    <TwitterTimelineEmbed
      sourceType="profile"
      screenName="CityOfLasVegas"
      theme="light"
      noBorder
      noHeader
      noFooter
      noScrollbar
      options={{ height: '80vh' }}
    />
  </Card>
);

export default Feed;
