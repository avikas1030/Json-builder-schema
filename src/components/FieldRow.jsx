import React from 'react';
import { Input, Select, Button, Space } from 'antd';

const { Option } = Select;

const FieldRow = ({ field, onChange, onRemove }) => {
  const handleChange = (key, value) => {
    const updatedField = { ...field, [key]: value };

    if (key === 'type' && value === 'nested') {
      updatedField.children = field.children || [];
    }

    onChange(updatedField);
  };

  const handleAddChild = () => {
    const children = [...(field.children || []), { name: '', type: '' }];
    onChange({ ...field, children });
  };

  const handleUpdateChild = (index, updatedChild) => {
    const children = [...(field.children || [])];
    children[index] = updatedChild;
    onChange({ ...field, children });
  };

  const handleRemoveChild = (index) => {
    const children = field.children.filter((_, i) => i !== index);
    onChange({ ...field, children });
  };

  return (
    <div style={{ marginLeft: 16, marginBottom: 16 }}>
      <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
        <Input
          placeholder="Field Name"
          value={field.name}
          onChange={e => handleChange('name', e.target.value)}
        />
        <Select
          value={field.type}
          onChange={value => handleChange('type', value)}
          style={{ width: 120 }}
        >
          <Option value="string">String</Option>
          <Option value="number">Number</Option>
          <Option value="object">Object</Option>
          <Option value="objectId">ObjectId</Option>
          <Option value="boolean">Boolean</Option>
          <Option value="float">Float</Option>
          <Option value="array">Array</Option>
          <Option value="nested">Nested</Option>
        </Select>
        <Button danger onClick={onRemove}>
          Remove
        </Button>
      </Space>

      
      {field.type === 'nested' && (
        <div style={{ borderLeft: '2px solid #ccc', paddingLeft: 12 }}>
          {field.children?.map((child, index) => (
            <FieldRow
              key={index}
              field={child}
              onChange={(updatedChild) => handleUpdateChild(index, updatedChild)}
              onRemove={() => handleRemoveChild(index)}
            />
          ))}
          <Button onClick={handleAddChild} type="primary" style={{ marginBottom: 16 }}>
            + Add Field
          </Button>
        </div>
      )}
    </div>
  );
};

export default FieldRow;
