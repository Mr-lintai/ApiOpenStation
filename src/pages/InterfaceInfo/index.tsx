import { PageContainer } from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import {Card, message} from "antd";
import {
  getInterfaceInfoByIdUsingGet,
} from "@/services/yuapi_backend/interfaceInfoController";
import {useParams} from "react-router";
import type { DescriptionsProps } from 'antd';
import { Descriptions } from 'antd';


/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {

  //需要3个状态变量
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>([]);
  const params  = useParams();

  //alert(JSON.stringify(match));

  const loadData = async () => {
    if(!params.id){
      message.error('参数不存在');
      return;
    }
    //表示正在加载
    setLoading(true);
    try {
      const res = await getInterfaceInfoByIdUsingGet({
        id: Number(params.id)
      });
      setData(res.data);
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
    <PageContainer title="查看接口文档">
      <Card>
        {data ? (<Descriptions title={data.name} column={1}>
            <Descriptions.Item label="接口状态">{data.status ? '正常':'已下线'}</Descriptions.Item>
            <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
            <Descriptions.Item label="请求地址">{data.url}</Descriptions.Item>
            <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
            <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
            <Descriptions.Item label="请求参数">{data.requestParams}</Descriptions.Item>
            <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>

        </Descriptions>)
          : (<>接口不存在</>)
        }

      </Card>

    </PageContainer>
  );
};

export default Index;
