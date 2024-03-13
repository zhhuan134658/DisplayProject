import { TableData } from '../types/runtime';
import React from 'react';
import { Button, Form, Input, Popup } from 'antd-mobile';

interface TableProps {
    data: TableData;
    handleAdd: (rowData: any) => void;
    handleDelete: (rowData: any) => void;
    handleClickRow: (rowData: any) => void;
}

const DetailTable: React.FC<TableProps> = (props) => {
    const { data, handleClickRow } = props;
    const columns = data.columns;
    const rows = data.data;
    const renderColumns = columns.map((column, index) => {
        return (
            <th className="table-header-column" key={index}>
                {column.title}
            </th>
        );
    });
    const renderRows = rows.map((row, index) => {
        return (
            <tr className="table-row" key={index} onClick={handleClickRow}>
                {Object.keys(row).map((key, index) => {
                    return (
                        <td className="table-cell" key={index}>
                            {row[key]}
                        </td>
                    );
                })}
            </tr>
        );
    });
    return (
        <div className="table-container" style={{ overflowX: 'auto' }}>
            <table className="detail-table">
                <thead>
                    <tr>{renderColumns}</tr>
                </thead>
                <tbody>{renderRows}</tbody>
            </table>
        </div>
    );
};

const DetailTablePopUp: React.FC<{
    rowData: any;
    handleSubmit: (rowData: any) => void;
    handleDelete: (rowData: any) => void;
}> = (props) => {
    const { rowData, handleDelete, handleSubmit } = props;
    const [visible, setVisible] = React.useState(false);
    const [row, setRow] = React.useState(rowData);
    return (
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
                    footer={
                        <div>
                            <Button
                                size="middle"
                                color="primary"
                                onClick={handleSubmit}
                            >
                                提交
                            </Button>
                            <Button
                                color="danger"
                                fill="outline"
                                onClick={handleDelete}
                            >
                                删除
                            </Button>
                        </div>
                    }
                >
                    {Object.keys(row).map((key, index) => {
                        return (
                            <Form.Item
                                label={row[key]['label']}
                                name={key}
                                key={index}
                            >
                                <Input
                                    placeholder={row[key]['placeholder']}
                                    value={row[key]['value']}
                                    onChange={(value) => {
                                        const newRow = row;
                                        newRow[key]['value'] = value;
                                        setRow(newRow);
                                    }}
                                />
                            </Form.Item>
                        );
                    })}
                </Form>
            </div>
        </Popup>
    );
};

const DetailTableAssembly: React.FC<{ data: TableData }> = (props) => {
    const { data } = props;
    const [row, setRow] = React.useState(data.data[0]);
    const addRow = (rowData: any) => {
        console.log(rowData);
        throw new Error('Not Implented');
    };
    const deleteRow = (rowData: any) => {
        console.log(rowData);

        throw new Error('Not Implented');
    };
    const rowClick = (rowData: any) => {
        setRow(rowData);
    };
    const submit = (rowData: any) => {
        console.log(rowData);
        throw new Error('Not Implented');
    };

    return (
        <div className="detail-table-container">
            <DetailTable
                data={data}
                handleAdd={addRow}
                handleDelete={deleteRow}
                handleClickRow={rowClick}
            />
            <DetailTablePopUp
                rowData={row}
                handleSubmit={submit}
                handleDelete={deleteRow}
            />
        </div>
    );
};

export { DetailTable, DetailTablePopUp, DetailTableAssembly };
