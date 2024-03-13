import React from 'react';
import {
  Button,
  CascadePicker,
  Form,
  Input,
  Picker,
  Popup,
  TextArea,
} from 'antd-mobile';
import {
  Modal as PCModal,
  Form as PCForm,
  Button as PCButton,
  Input as PCInput,
  TreeSelect as PCTreeSelect,
} from 'antd';
import { AddOutline } from 'antd-mobile-icons';
const wrapperStyle: React.CSSProperties = {
  justifyContent: 'center',
  display: 'flex',
  WebkitJustifyContent: 'center',
  alignItems: 'center',
  padding: 0,
  position: 'sticky',
  top: 0,
  zIndex: 1500,
  width: '100vw',
};
import { createPortal } from 'react-dom';

const HandledDetailDialogMobile: React.FC<{
  cascadeData: Array<any>;
  onFinish: (values: any) => void;
  onFinishFailed: (errorInfo: any) => void;
  showElem?: string;
}> = props => {
  const { cascadeData, onFinish, onFinishFailed, showElem } = props;
  const [visible, setVisible] = React.useState(false);
  const [cascadeVisible, setCascadeVisible] = React.useState(false);
  const [cascadeValue, setCascadeValue] = React.useState([]);
  const renderData = (cascadePickerData: Array<any>) => {
    let string = '请选择';
    if (cascadePickerData.length === 0) {
      return <span>{string}</span>;
    }
    string = cascadePickerData
      .map(item => {
        if (item) {
          const parsedItem = JSON.parse(item.value);
          const title = parsedItem.title;
          return title;
        }
      })
      .join('-');
    return <span>{string}</span>;
  };
  const wrappedFinish = (values: any) => {
    const parsedValues = {
      name: values['name'],
      size: values['size'],
      unit: values['unit'],
      type: '',
    };
    if (values['type']) {
      for (let i = values['type'].length; i > 0; i--) {
        if (values['type'][i - 1]) {
          parsedValues['type'] = JSON.parse(values['type'][i - 1])['key'];
          break;
        }
      }
    }
    setVisible(false);
    onFinish(parsedValues);
  };
  const wrappedFinishFailed = (errorInfo: any) => {
    // setVisible(false);
    onFinishFailed(errorInfo);
  };
  const setButtonStyle = () => {
    const style: React.CSSProperties = {
      position: 'fixed',
      bottom: '16px',
      right: '16px',
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      width: '48px',
      height: '48px',
      zIndex: 1600,
      boxShadow: '0px 0px 4px rgba(0,0,0,0.2)',
    };
    if (showElem && !visible) {
      style.display = showElem;
    } else {
      style.display = 'none';
    }
    return style;
  };
  return (
    <div style={wrapperStyle}>
      {createPortal(
        <Button
          block
          onClick={() => {
            setVisible(true);
          }}
          color="primary"
          style={setButtonStyle()}
        >
          <AddOutline fontSize={32} />
        </Button>,
        document.getElementById('MF_APP'),
      )}
      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
        bodyStyle={{
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          paddingTop: '16px',
          paddingLeft: '8px',
          paddingRight: '8px',
          minHeight: '60vh',
        }}
      >
        <div style={{ height: '60vh', overflowY: 'scroll' }}>
          <Form
            onFinish={wrappedFinish}
            onFinishFailed={wrappedFinishFailed}
            footer={
              <Button block type="submit" color="primary">
                提交
              </Button>
            }
          >
            <Form.Item
              label="物品名称"
              name="name"
              rules={[{ required: true, message: '请填写物品名称' }]}
            >
              <Input placeholder="请填写物品名称" />
            </Form.Item>
            <Form.Item
              label="单位"
              name="unit"
              rules={[{ required: true, message: '请填写单位' }]}
            >
              <Input placeholder="请填写单位" />
            </Form.Item>
            <Form.Item
              label="规格型号"
              name="size"
              rules={[{ required: true, message: '请填写规格型号' }]}
            >
              <Input placeholder="请填写规格型号" />
            </Form.Item>
            <Form.Item
              label="物品类型"
              name="type"
              rules={[{ required: true, message: '请填写物品类型' }]}
              onClick={() => {
                setCascadeVisible(true);
              }}
              trigger="onConfirm"
            >
              <CascadePicker
                options={cascadeData}
                visible={cascadeVisible}
                onClose={() => {
                  setCascadeVisible(false);
                }}
                value={cascadeValue}
                onConfirm={(value: any) => {
                  setCascadeValue(value);
                }}
              >
                {value => renderData(value)}
              </CascadePicker>
            </Form.Item>
          </Form>
        </div>
      </Popup>
    </div>
  );
};

const DetailDialogDesktop: React.FC<{
  treeData: Array<any>;
  onFinish: (values: any) => void;
  onFinishFailed: (values: any) => void;
}> = props => {
  const { treeData, onFinish, onFinishFailed } = props;
  const [visible, setVisible] = React.useState(false);
  const [treeValue, setTreeValue] = React.useState([]);
  const wrappedFinish = (values: any) => {
    onFinish(values);
    setVisible(false);
  };
  return (
    <div>
      <PCButton
        size="large"
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        新增
      </PCButton>
      <PCModal
        onCancel={() => {
          setVisible(false);
        }}
        visible={visible}
        width={750}
        title="新增物资"
        footer={null}
      >
        <PCForm
          initialValues={{ remember: true }}
          layout="vertical"
          onFinish={wrappedFinish}
          onFinishFailed={onFinishFailed}
        >
          <PCForm.Item
            label="物品名称"
            name="name"
            rules={[{ required: true, message: '请填写物品名称' }]}
          >
            <PCInput placeholder="填写物品名称" />
          </PCForm.Item>
          <PCForm.Item
            label="单位"
            name="unit"
            rules={[{ required: true, message: '请填写单位' }]}
          >
            <PCInput placeholder="填写单位" />
          </PCForm.Item>
          <PCForm.Item
            label="规格型号"
            name="size"
            rules={[{ required: true, message: '请填写规格型号' }]}
          >
            <PCInput placeholder="填写规格型号" />
          </PCForm.Item>
          <PCForm.Item
            label="物品类型"
            name="type"
            rules={[{ required: true, message: '请填写物品类型' }]}
          >
            <PCTreeSelect
              style={{ width: '100%' }}
              value={treeValue}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={treeData}
              placeholder="请选择"
              treeDefaultExpandAll
              onChange={setTreeValue}
            />
          </PCForm.Item>
          <PCForm.Item className="newForm">
            <PCButton
              type="primary"
              htmlType="submit"
              style={{
                marginRight: '16px',
              }}
            >
              确认
            </PCButton>
            <PCButton
              type="ghost"
              onClick={() => {
                setVisible(false);
              }}
            >
              取消
            </PCButton>
          </PCForm.Item>
        </PCForm>
      </PCModal>
    </div>
  );
};
class DetailDialogMobile extends React.Component<
  {
    visible: false;
    treeData: any;
    treeValue: any;
    cascadeVisible: false;
    onChangeTree: (value: any) => void;
    handleVisible: (visible: boolean) => void;
    handleCascadeVisible: (visible: boolean) => void;
    onFinish: (values: any) => void;
    onFinishFailed: (errorInfo: any) => void;
  },
  {}
> {
  render() {
    const {
      visible,
      handleVisible,
      onFinish,
      onFinishFailed,
      treeValue,
      cascadeVisible,
      treeData,
      onChangeTree,
      handleCascadeVisible,
    } = this.props;
    const renderData = (treeValue: Array<any>) => {
      console.log('TREE VAL', treeValue);
      let string = '请选择';
      if (treeValue.length === 0) {
        return <span>{string}</span>;
      }
      string = treeValue
        .map(item => {
          if (item) {
            const parsedItem = JSON.parse(item.value);
            const title = parsedItem.title;
            return title;
          }
        })
        .join('-');
      return <span>{string}</span>;
    };
    const wrappedFinish = (values: any) => {
      const parsedValues = {
        name: values['name'],
        size: values['size'],
        unit: values['unit'],
        type: '',
      };
      if (values['type']) {
        for (let i = values['type'].length; i > 0; i--) {
          if (values['type'][i - 1]) {
            parsedValues['type'] = JSON.parse(values['type'][i - 1])['key'];
            break;
          }
        }
      }
      onFinish(parsedValues);
    };
    return (
      <Popup
        visible={visible}
        onMaskClick={() => {
          handleVisible(false);
        }}
        bodyStyle={{
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          paddingTop: '16px',
          paddingLeft: '8px',
          paddingRight: '8px',
          minHeight: '60vh',
        }}
      >
        <div style={{ height: '60vh', overflowY: 'scroll' }}>
          <Form
            onFinish={wrappedFinish}
            onFinishFailed={onFinishFailed}
            footer={
              <Button block type="submit" color="primary">
                提交
              </Button>
            }
          >
            <Form.Item
              label="物品名称"
              name="name"
              rules={[{ required: true, message: '请填写物品名称' }]}
            >
              <Input placeholder="请填写物品名称" />
            </Form.Item>
            <Form.Item
              label="单位"
              name="unit"
              rules={[{ required: true, message: '请填写单位' }]}
            >
              <Input placeholder="请填写单位" />
            </Form.Item>
            <Form.Item
              label="规格型号"
              name="size"
              rules={[{ required: true, message: '请填写规格型号' }]}
            >
              <Input placeholder="请填写规格型号" />
            </Form.Item>
            <Form.Item
              label="物品类型"
              name="type"
              rules={[{ required: true, message: '请填写物品类型' }]}
              onClick={() => {
                handleCascadeVisible(true);
              }}
              trigger="onConfirm"
            >
              <CascadePicker
                options={treeData}
                visible={cascadeVisible}
                onClose={() => {
                  handleCascadeVisible(false);
                }}
                value={treeValue}
                onConfirm={onChangeTree}
              >
                {value => renderData(value)}
              </CascadePicker>
            </Form.Item>
          </Form>
        </div>
      </Popup>
    );
  }
}

interface SupplierForm {
  name: string;
  supplier_type: string;
  unit_nature: string;
}

const SupplierMobileDialog: React.FC<{
  onFinish: (values: SupplierForm) => void;
  onFinishFailed: (error: any) => void;
  supplierTypes: Array<any>;
}> = props => {
  const { onFinish, onFinishFailed, supplierTypes } = props;
  const [visible, setVisible] = React.useState(false);
  const [pickerVisible, setPickerVisible] = React.useState(false);
  const [naturePickerVisible, setNaturePickerVisible] = React.useState(false);
  const [pickerValue, setPickerValue] = React.useState([]);
  const [naturePickerValue, setNaturePickerValue] = React.useState([]);
  const pickerDataRender = (pickerData: Array<any>) => {
    if (pickerData.length === 0) {
      return <span>请选择</span>;
    }
    return <span>{`${pickerData[0].label}`}</span>;
  };
  const Options = [
    [
      ...supplierTypes.map(item => {
        return {
          label: item.title,
          value: item.title,
        };
      }),
    ],
  ];
  const wrappedFinish = (values: {
    name: string;
    supplier_type: Array<string>;
    unit_nature: Array<string>;
  }) => {
    const parsedValues = {
      name: '',
      supplier_type: '',
      unit_nature: '',
    };
    if (values['supplier_type'].length > 0) {
      parsedValues.supplier_type = values['supplier_type'][0];
    }
    if (values['unit_nature'].length > 0) {
      parsedValues.unit_nature = values['unit_nature'][0];
    }
    parsedValues.name = values.name;
    console.log('WRAPPED FINISH', values);
    onFinish(parsedValues);
    setVisible(false);
  };
  const wrappedFinishFailed = (error: any) => {
    onFinishFailed(error);
  };
  const natures: Array<any> = [
    [
      { label: '事业', value: '事业' },
      { label: '企业', value: '企业' },
      { label: '社团', value: '社团' },
      { label: '自然人', value: '自然人' },
      { label: '其他', value: '其他' },
    ],
  ];
  return (
    <div style={wrapperStyle}>
      <Button
        block
        onClick={() => {
          setVisible(true);
        }}
        color="primary"
      >
        新增供应商
      </Button>
      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
        bodyStyle={{
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          paddingTop: '16px',
          paddingLeft: '8px',
          paddingRight: '8px',
          minHeight: '60vh',
        }}
      >
        <div style={{ height: '60vh', overflowY: 'scroll' }}>
          <Form
            onFinish={wrappedFinish}
            onFinishFailed={wrappedFinishFailed}
            footer={
              <Button block type="submit" color="primary">
                提交
              </Button>
            }
          >
            <Form.Item
              label="单位名称"
              name="name"
              rules={[{ required: true, message: '请填写单位名称' }]}
            >
              <Input placeholder="请填写单位名称" />
            </Form.Item>
            <Form.Item
              label="单位类型"
              name="supplier_type"
              rules={[{ required: true, message: '请填写单位类型' }]}
              trigger="onConfirm"
              onClick={() => {
                setPickerVisible(true);
              }}
            >
              <Picker
                columns={Options}
                visible={pickerVisible}
                onClose={() => {
                  setPickerVisible(false);
                }}
                value={pickerValue}
                onConfirm={value => {
                  setPickerValue(value);
                }}
              >
                {value => pickerDataRender(value)}
              </Picker>
            </Form.Item>
            <Form.Item
              label="单位性质"
              name="unit_nature"
              rules={[{ required: true, message: '请填写单位性质' }]}
              trigger="onConfirm"
              onClick={() => {
                setNaturePickerVisible(true);
              }}
            >
              <Picker
                columns={natures}
                visible={naturePickerVisible}
                onClose={() => {
                  setNaturePickerVisible(false);
                }}
                value={naturePickerValue}
                onConfirm={value => {
                  setNaturePickerValue(value);
                }}
              >
                {value => pickerDataRender(value)}
              </Picker>
            </Form.Item>
          </Form>
        </div>
      </Popup>
    </div>
  );
};
SupplierMobileDialog.displayName = 'SupplierMobileDialog';

interface StorageForm {
  name: string;
  number: number;
  address: string;
  remarks: string;
}

const StorageMobileDialog: React.FC<{
  onFinish: (values: StorageForm) => void;
  onFinishFailed: (error: any) => void;
}> = props => {
  const { onFinish, onFinishFailed } = props;
  const [visible, setVisible] = React.useState(false);
  const wrappedFinish = (values: StorageForm) => {
    console.log('WRAPPED FINISH', values);
    onFinish(values);
    setVisible(false);
  };
  const wrappedFinishFailed = (error: any) => {
    onFinishFailed(error);
  };
  return (
    <div style={wrapperStyle}>
      <Button
        block
        onClick={() => {
          setVisible(true);
        }}
        color="primary"
        style={{
          width: '80%',
        }}
      >
        新增仓库
      </Button>
      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
        bodyStyle={{
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          paddingTop: '16px',
          paddingLeft: '8px',
          paddingRight: '8px',
          minHeight: '60vh',
        }}
      >
        <div style={{ height: '60vh', overflowY: 'scroll' }}>
          <Form
            onFinish={wrappedFinish}
            onFinishFailed={wrappedFinishFailed}
            footer={
              <Button block type="submit" color="primary">
                提交
              </Button>
            }
          >
            <Form.Item
              label="仓库名称"
              name="name"
              rules={[{ required: true, message: '请填写仓库名称' }]}
            >
              <Input placeholder="仓库名称" />
            </Form.Item>
            <Form.Item
              label="仓库编号"
              name="number"
              rules={[{ required: true, message: '请填写仓库编号' }]}
            >
              <Input type="number" placeholder="仓库编号" />
            </Form.Item>
            <Form.Item
              label="仓库地址"
              name="address"
              rules={[{ required: true, message: '请填写仓库地址' }]}
            >
              <Input placeholder="仓库地址" />
            </Form.Item>
            <Form.Item label="备注" name="remarks">
              <TextArea placeholder="备注" />
            </Form.Item>
          </Form>
        </div>
      </Popup>
    </div>
  );
};

const StorageDesktopDialog: React.FC<{
  onFinish: (values: StorageForm) => void;
  onFinishFailed: (error: any) => void;
  visible?: boolean;
}> = props => {
  const { onFinish, onFinishFailed } = props;
  const [visible, setVisible] = React.useState(false);
  const wrappedFinish = (values: StorageForm) => {
    console.log('WRAPPED FINISH', values);
    onFinish(values);
    setVisible(false);
  };
  const wrappedFinishFailed = (error: any) => {
    onFinishFailed(error);
  };
  return (
    <div>
      <PCButton
        onClick={() => {
          setVisible(true);
        }}
        size="large"
        type="primary"
        style={{
          marginLeft: '8px',
        }}
      >
        新增
      </PCButton>
      <PCModal
        onCancel={() => {
          setVisible(false);
        }}
        visible={visible}
        width={750}
        title="新增仓库"
        footer={null}
      >
        <PCForm
          initialValues={{ remember: true }}
          layout="vertical"
          onFinish={wrappedFinish}
          onFinishFailed={wrappedFinishFailed}
        >
          <PCForm.Item
            label="仓库名称"
            name="name"
            rules={[{ required: true, message: '请填写仓库名称' }]}
          >
            <PCInput placeholder="仓库名称" />
          </PCForm.Item>
          <PCForm.Item
            label="仓库编号"
            name="number"
            rules={[{ required: true, message: '请填写仓库编号' }]}
          >
            <PCInput type="number" placeholder="仓库编号" />
          </PCForm.Item>
          <PCForm.Item
            label="仓库地址"
            name="address"
            rules={[{ required: true, message: '请填写仓库地址' }]}
          >
            <PCInput placeholder="仓库地址" />
          </PCForm.Item>
          <PCForm.Item label="备注" name="remarks">
            <PCInput.TextArea placeholder="备注" />
          </PCForm.Item>
          <PCForm.Item className="newForm">
            <PCButton
              type="primary"
              htmlType="submit"
              style={{
                marginRight: '16px',
              }}
            >
              确认
            </PCButton>
            <PCButton
              type="ghost"
              onClick={() => {
                setVisible(false);
              }}
            >
              取消
            </PCButton>
          </PCForm.Item>
        </PCForm>
      </PCModal>
    </div>
  );
};

export {
  DetailDialogDesktop,
  HandledDetailDialogMobile,
  DetailDialogMobile,
  SupplierMobileDialog,
  StorageMobileDialog,
  StorageDesktopDialog,
};
