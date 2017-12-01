/**
 * Created by chenzhongying on 2017/10/23.
 */
import React from 'react';
import {Router, Route, IndexRoute, Link, hashHistory} from 'react-router';
import {
    Page,
    Button,
    ButtonArea,
    Flex,
    FlexItem,
    Tab,
    TabBarItem,
    Article,
    IconArticle,
    InfiniteLoader,
    Cells,
    CellsTitle,
    Cell,
    CellBody,
    CellFooter
} from 'react-weui/build/packages';

import IconButton from '../images/pull.png';
import '../css/common.css';


class Common extends React.Component {
    render() {
        return (
            <div id="moreTerm-wrap">
                {this.props.children}
                <Tab type="tabbar">
                    <TabBarItem icon={<Link to="/home/operate"><img src={IconButton}/></Link>} label="运营分析" active={true}>
                    </TabBarItem>
                    <TabBarItem
                        icon={<Link to="/home/test"><img src={IconButton}/></Link>}
                        label="设备管理">
                    </TabBarItem>
                </Tab>
            </div>
        )
    }
}

export default Common;