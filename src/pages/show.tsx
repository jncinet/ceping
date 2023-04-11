import { connect, ConnectRC, useParams } from 'umi';
import React, { useEffect, useState } from 'react';
import { QuestionModelState } from '@/models/questionModel';
import Detailed from '@/components/Detailed';
import Questions from '@/components/Questions/Questions';

interface PageProps {
  questionModel: QuestionModelState;
}

const ShowPage: ConnectRC<PageProps> = ({ questionModel }) => {
  const { item: data } = questionModel;
  const [isStart, start] = useState<boolean>(false);
  const [cache, setCache] = useState<string>('');
  const { id } = useParams();
  useEffect(() => {
    // 数据加载完成，读取是否有缓存结果
    if (data) setCache(localStorage.getItem('item-' + id) || '');
  }, [id]);
  return data ? (
    isStart ? (
      <Questions
        data={data}
        cache={cache}
        onCancel={() => start(false)}
        clearCache={() => setCache('')}
      />
    ) : (
      <Detailed data={data} cache={cache} onClick={() => start(true)} />
    )
  ) : (
    <div className={'w-screen h-screen flex justify-center items-center'}>
      <div
        className={
          'w-20 h-20 bg-gray-400 rounded-xl flex justify-center items-center'
        }
      >
        <div className={'text-white text-sm'}>加载中...</div>
      </div>
    </div>
  );
};

export default connect(
  ({ questionModel }: { questionModel: QuestionModelState }) => ({
    questionModel,
  }),
)(ShowPage);
