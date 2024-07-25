import React from 'react';

function TagsInput({ field, form }) {
  const handleKeyDown = (e) => {
    const { value } = e.target;

    if (e.key === 'Enter' && value.trim()) {
      e.preventDefault();
      form.setFieldValue(field.name, [...field.value, value.trim()]);
      e.target.value = '';
    }
  };

  const removeTag = (tagToRemove) => {
    form.setFieldValue(field.name, field.value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <>
      <input
        type="text"
        className="form-control"
        placeholder="Enter tags"
        onKeyDown={handleKeyDown}
      />
      <div className="tag-list">
        {field?.value?.map((tag, index) => (
          <span key={index} className="tag-default tag-pill">
            <i
              className="ion-close-round"
              onClick={() => removeTag(tag)}
            />
            {tag}
          </span>
        ))}
      </div>
    </>
  );
}

export default TagsInput;
