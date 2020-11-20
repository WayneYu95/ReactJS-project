import {Row,  Card, Col, Divider, Avatar } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Articles from './components/Articles';
import Applications from './components/Applications';
import Projects from './components/Projects';
import TagList from './components/TagList';
import { currentUser, fakeList} from './data';
import { ContactsOutlined, ClusterOutlined, HomeOutlined } from '@ant-design/icons';
import styles from './index.module.less';
import { getUserProfile } from '../../actions/profile';
import { useDispatch, useMappedState } from 'redux-react-hook';

const articleList = fakeList(8);
const applicationList = fakeList(10);
const projectList =fakeList(18);

const mapState = state => state.profile;

const operationTabList = [
    {key: 'articles', 
     tab:(
        <span>文章
            <span>
                (8)
            </span>
        </span>)},
    {key: 'applications', 
    tab:(
        <span>应用
            <span>
                (10)
            </span>
        </span>)},
    {key: 'projects', 
    tab:(
        <span>项目
            <span>
                (18)
            </span>
        </span>)}];

const renderChilderenByTabKey = (tabKey) => {
    switch (tabKey) {
        case 'projects':
            return <Projects list={projectList}/>;
        case 'applications':
            return <Applications list={applicationList}/>;
        case 'articles':
        default:
            return <Articles list={articleList} />;
    }
}

const renderUserInfo = () => (
    <div className={styles.detail}>
        <p>
            <ContactsOutlined className={styles.userInfoIcon} />
            {currentUser.title}
        </p>
        <p>
            <ClusterOutlined className={styles.userInfoIcon} />
            {currentUser.group}
        </p>
        <p>
            <HomeOutlined className={styles.userInfoIcon} />
            {(currentUser.geographic || {provience: {label: ''}}).province.label}
            {(currentUser.geographic || {city: {label: ''}}).city.label}
        </p>
    </div>
)
const Home = () => {
    const dispatch = useDispatch();
    const { user = {} } = useMappedState(mapState);
    const [tabKey, setTabKey] = useState('articles');
    const onTabChange = (key) => {
        setTabKey(key);
    }
    useEffect(() => {
        dispatch(getUserProfile());
    }, [dispatch]);
    return (
        <div className={styles.container}>
            <Row gutter={24}>
                <Col lg={7} md={24}>
                    <Card bordered={false} style={{marginBottom: 24}}>
                        <div className={styles.avatarHolder}>
                            <img alt="" src={currentUser.avatar} />
                            <div className={styles.name}>{user.username}</div>
                            <div>{currentUser.signature}</div>
                        </div>
                        {renderUserInfo(currentUser)}
                        <Divider dashed />
                        <TagList tags={currentUser.tags} />
                        <Divider dashed />
                        <div className={styles.team}>
                            <div className={styles.teamTitle}>团队</div>
                            <Row gutter={36}>
                                {
                                    currentUser.notice && 
                                    currentUser.notice.map((item) => (
                                        <Col key={item.id} lg={24} xl={12}>
                                            <Link to="/setting">
                                                <Avatar size="small" src={item.logo} />
                                                {item.member}
                                        </Link>
                                    </Col>
                                    ))
                                }
                            </Row>
                        </div>
                    </Card>
                </Col>
                <Col lg={17} md={24}>
                    <Card 
                        bordered={false} 
                        tabList={operationTabList}
                        activeTabKey={tabKey}
                        onTabChange={onTabChange}>
                    {renderChilderenByTabKey(tabKey)}
                    </Card>
                </Col>
            </Row>
        </div>
    )
};

export default Home;