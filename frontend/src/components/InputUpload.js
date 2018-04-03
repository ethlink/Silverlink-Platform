// import React from 'react';
// import { Form, Upload, Button, Icon } from 'antd';

// const FormItem = Form.Item;

// const props = {
//     onRemove: (file) => {
//         this.setState(({ fileList }) => {
//         const index = fileList.indexOf(file);
//         const newFileList = fileList.slice();
//         newFileList.splice(index, 1);
//         return {
//             fileList: newFileList,
//         };
//         });
//     },
//     beforeUpload: (file) => {
//         this.setState(({ fileList }) => ({
//         fileList: [...fileList, file],
//         }));
//         return false;
//     },
//     fileList: this.state.fileList,
// };

// const InputText = ({
//   input, label, meta: { error, touched },
// }) => (
//   <FormItem className={(touched && error) ? 'has-error' : ''}>
//     <Upload {...input} {...props}>
//       <label>{label}</label>

//       <Button>
//         <Icon type="upload" /> Select File
//       </Button>
//     </Upload>

//     <div className="ant-form-explain">
//       {touched && error}
//     </div>
//   </FormItem>
// );

// export default InputText;


// import React from 'react';
// import { Upload, Button, Icon } from 'antd';

// class InputUpload extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       fileList: [],
//     };

//     this.handleUpload = this.handleUpload.bind(this);
//   }

//   handleUpload() {
//     // const { fileList } = this.state;
//     // const formData = new FormData();
//     // fileList.forEach((file) => {
//     //   formData.append('files[]', file);
//     // });

//     // this.setState({
//     //   uploading: true,
//     // });

//     // You can use any AJAX library you like
//     // reqwest({
//     //   url: '//jsonplaceholder.typicode.com/posts/',
//     //   method: 'post',
//     //   processData: false,
//     //   data: formData,
//     //   success: () => {
//     //     this.setState({
//     //       fileList: [],
//     //       uploading: false,
//     //     });
//     //     message.success('upload successfully.');
//     //   },
//     //   error: () => {
//     //     this.setState({
//     //       uploading: false,
//     //     });
//     //     message.error('upload failed.');
//     //   },
//     // });
//   }

//   render() {
//     const props = {
//       action: '//jsonplaceholder.typicode.com/posts/',
//       onRemove: (file) => {
//         this.setState(({ fileList }) => {
//           const index = fileList.indexOf(file);
//           const newFileList = fileList.slice();
//           newFileList.splice(index, 1);
//           return {
//             fileList: newFileList,
//           };
//         });
//       },
//       beforeUpload: (file) => {
//         this.setState(({ fileList }) => ({
//           fileList: [...fileList, file],
//         }));
//         return false;
//       },
//       fileList: this.state.fileList,
//     };

//     return (
//       <div>
//         <Upload {...props}>
//           <Button>
//             <Icon type="upload" /> Select File
//           </Button>
//         </Upload>

//         {/* <Button
//           className="upload-demo-start"
//           type="primary"
//           onClick={this.handleUpload}
//           disabled={this.state.fileList.length === 0}
//           loading={uploading}
//         >
//           {uploading ? 'Uploading' : 'Start Upload' }
//         </Button> */}
//       </div>
//     );
//   }
// }


import React from 'react';

class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { input: { onChange } } = this.props;
    onChange(e.target.files[0]);
  }

  render() {
    const { input: { value } } = this.props;

    console.log(value);

    return (
      <input
        type="file"
        onChange={this.onChange}
      />
    );
  }
}

export default FileInput;
