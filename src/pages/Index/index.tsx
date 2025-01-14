import { PageContainer } from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import {List, message} from "antd";
import {
  listInterfaceInfoByPageUsingGet
} from "@/services/yuapi_backend/interfaceInfoController";


/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {

  //需要3个状态变量
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  const [total, setTotal] = useState<number>(0);

  const loadData = async (current: number = 1, pageSize: number = 2) => {
    //表示正在加载
    setLoading(true);
    try {
      const res = await listInterfaceInfoByPageUsingGet({
        current, pageSize
      })
      //可选链，如果为undefined，则返回空数组
      setList(res?.data?.records ?? []);
      setTotal(res?.data?.total ?? 0);
    }catch(error: any){
      message.error('请求失败，' + error.message);
    }
    //表示加载完成
    setLoading(false);
  }

  //加载数据的逻辑
  //在页面首次调用时，向后台发送数据
  useEffect(()=>{
    loadData();
  }, [])

  return (
    <PageContainer title="鱼皮在线接口开放平台">
      <List
        className="my-list"
        loading={loading}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => {
          const apiLink = `/interface_info/${item.id}`;
          return <List.Item
            //item.id保证每个key不重复
            actions={[<a key = "item.id" href={apiLink}>查看</a>]}
          >
            <List.Item.Meta
              title={<a href={apiLink}>{item.name}</a>}
              description= {item.description}
            />
            <div>

            </div>

          </List.Item>
          }
        }
        pagination={
          {
            showTotal(total){
              return '总数: ' + total;
            },
            pageSize: 2,
            total,
            onChange(page, pageSize) {
              loadData(page, pageSize);
              }
          }
        }
      />
    </PageContainer>
  );
};

export default Index;
