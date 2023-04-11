import React from 'react';
import { Link } from 'umi';

interface Props {
  data: API.Question;
  onClick: () => void;
  cache: string;
}

// 脚手架示例组件
const Detailed: React.FC<Props> = ({ data, onClick, cache }) => {
  const { thumbnail, title, content } = data;
  return (
    <div className={'bg-white'}>
      <div
        className={'sticky top-0 bg-gradient-to-r from-red-600 to-red-300 h-40'}
      >
        <div
          style={{
            backgroundImage: `url("${thumbnail}")`,
            backgroundPosition: 'right center',
            backgroundSize: 'auto 66%',
            backgroundRepeat: 'no-repeat',
          }}
          className={'pl-5 h-full flex flex-col justify-center gap-y-1'}
        >
          <div className={'text-white text-xl font-medium'}>{title}</div>
          <div
            className={
              'text-ellipsis overflow-hidden text-shadow w-2/3 h-10 text-xs leading-5 text-white/75'
            }
          >
            {data.description}
          </div>
        </div>
      </div>
      <div className={'p-4 grow'}>
        <div className={'text-lg font-medium mb-1'}>试题说明</div>
        <div className={'text-sm text-slate-600 leading-6 whitespace-pre-wrap'}>
          {content}
        </div>
      </div>
      <div className={'sticky bottom-0 p-4 bg-white z-10'}>
        <button
          onClick={onClick}
          type="button"
          className={
            'shadow-lg w-full text-center bg-red-500 rounded-md text-lg text-white leading-10'
          }
        >
          {cache.length > 0 ? '查看结果' : '开始测评'}
        </button>
        <Link
          to={'/'}
          className={
            'mt-3 block w-full text-center bg-gray-200 rounded-md text-lg text-slate-500 leading-10'
          }
        >
          返回列表
        </Link>
      </div>
    </div>
  );
};

export default Detailed;
