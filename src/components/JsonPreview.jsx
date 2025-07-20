import React from 'react';
import { Card } from 'antd';

const JsonPreview = ({ json }) => (
  <Card title="Live JSON Schema Preview" style={{ marginTop: 20 }}>
    <pre>{JSON.stringify(json, null, 2)}</pre>
  </Card>
);

export default JsonPreview;
