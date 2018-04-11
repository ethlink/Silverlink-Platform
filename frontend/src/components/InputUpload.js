import React from 'react';
import { Upload, Button, Icon } from 'antd';

class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fileList: [] };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    const { input: { value } } = this.props;
    if (value) {
      this.setState({ fileList: [value] });
    }
  }

  onChange(uploadData) {
    const { input: { onChange } } = this.props;
    const { file } = uploadData;

    onChange(file);
  }

  render() {
    const { meta: { error, touched } } = this.props;
    const props = {
      onRemove: () => {
        this.onChange({ file: '' });
        this.setState({ fileList: [] });
      },
      beforeUpload: (file) => {
        if (file.size < 1024 * 1024 * 2) {
          this.setState({ fileList: [file] });
        }

        return false;
      },
      fileList: this.state.fileList,
    };

    return (
      <div style={{ padding: '5px 0 15px 0' }}>
        <Upload
          onChange={this.onChange}
          className={(touched && error) ? 'has-error' : ''}
          accept="image/*"
          {...props}
        >
          <label>{this.props.label}</label>
          <Button style={{ marginBottom: 5 }}>
            <Icon type="upload" /> Select File
          </Button>

          <div className="ant-form-explain">
            {touched && error}
          </div>
        </Upload>
      </div>
    );
  }
}

export default FileInput;
