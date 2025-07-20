import React, { useState } from 'react';
import FieldRow from '../components/FieldRow';
import JsonPreview from '../components/JsonPreview';
import { Button } from 'antd';

const SchemaBuilder = () => {
  const [fields, setFields] = useState([]);

  const addField = () => {
    setFields([...fields, { name: '', type: '', children: [] }]);
  };

  const updateField = (index, updatedField) => {
    const updatedFields = [...fields];
    updatedFields[index] = updatedField;
    setFields(updatedFields);
  };

  const removeField = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  const generateSchema = (fieldList = fields) => {
    const schema = {};
    fieldList.forEach(field => {
      if (field.type === 'nested') {
        schema[field.name] = generateSchema(field.children || []);
      } else {
        schema[field.name] = field.type;
      }
    });
    return schema;
  };

  return (
    <div style={{ padding: 24 }}>
      {fields.map((field, index) => (
        <FieldRow
          key={index}
          field={field}
          onChange={(updatedField) => updateField(index, updatedField)}
          onRemove={() => removeField(index)}
        />
      ))}
      <Button onClick={addField} type="primary" style={{ marginBottom: 16 }}>
       + Add Field
      </Button>
      <JsonPreview json={generateSchema()} />
    </div>
  );
};

export default SchemaBuilder;
