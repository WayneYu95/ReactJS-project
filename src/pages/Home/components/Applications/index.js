import React from 'react';
import { Card, Dropdown, List, Menu, Tooltip } from 'antd';
import numeral from 'numeral';
import styles from './index.module.less';
import { DownloadOutlined, EditOutlined, ShareAltOutlined, EllipsisOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';

const itemMenu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener norferrer" href="http://www.alipay.com">
                1st menu Item
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener norferrer" href="http://www.alipay.com">
                2nd menu Item
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener norferrer" href="http://www.alipay.com">
                3rd menu Item
            </a>
        </Menu.Item>
    </Menu>
)

const CardInfo =({ activeUser, newUser }) => (
    <div className={styles.cardInfo}>
        <div>
            <p>活跃用户</p>
            <p>{activeUser}</p>
        </div>
        <div>
            <p>新增用户</p>
            <p>{newUser}</p>
        </div>
    </div>
);

function formatWan(val) {
    const v = val * 1;
    if (!v || Number.isNaN(v)) return '';
    let result = val;
    if (val > 10000) {
        result = (
            <span>
                {Math.floor(val / 10000)}
                <span>
                 万
                </span>
            </span>

        )
    }
    return result;
}


const Applications = ({list}) => {
    return (
        <List 
            className={styles.filterCardList}
            rowKey="id"
            grid={{ gutter: 24, xxl: 3, xl:2, l:2, md: 2, sm:2, xs:1}}
            dataSource={list}
            renderItem={(item) => (
                <List.Item 
                    key={item.id} 
                >
                    <Card 
                        hoverable
                        bodyStyle={{ paddingBottom: 20}}
                        actions={[
                            <Tooltip key="download" title="下载">
                                <DownloadOutlined />
                            </Tooltip>,
                            <Tooltip key="edit" title="编辑">
                                <EditOutlined />
                            </Tooltip>,
                            <Tooltip key="share" title="分享">
                                <ShareAltOutlined />
                            </Tooltip>,                                                    
                            <Dropdown key="ellipsis" overlay={itemMenu}>
                                <EllipsisOutlined />
                            </Dropdown>
                        ]}
                    >
                        <Card.Meta 
                            avatar={<Avatar size="small" src={item.avatar} />} 
                            title={item.title}
                        />
                        <div>
                            <CardInfo
                                activeUser={formatWan(item.activeUser)}
                                newUser={numeral(item.newUser).format('0,0')}
                            />
                        </div>
                    </Card>
                </List.Item>
            )}
        />

    )
}

export default Applications;