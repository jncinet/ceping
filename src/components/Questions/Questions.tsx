import React, { useState } from 'react';
import { history } from 'umi';
import successfulSrc from '@/assets/successful.png';

interface Props {
  data: API.Question;
  onCancel: () => void;
  cache: string;
  clearCache: () => void;
}

const Questions: React.FC<Props> = ({ data, onCancel, cache, clearCache }) => {
  // 题目索引
  const [index, setIndex] = useState<number>(0);
  const { title, questions, answer, type } = data;
  // 区间分数累加统计
  const [score, setScore] = useState<number>(0);
  // mbTi节点数计算
  const [mbTi, setMbTi] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0]);
  const [finish, setFinish] = useState(cache.length > 0);
  const [okText, setOkText] = useState<string>(cache);
  const handleSuccess = () => {
    localStorage.setItem('item-' + data.id, okText);
    history.push('/');
  };
  const handleRestart = () => {
    localStorage.removeItem('item-' + data.id);
    setFinish(false);
    setOkText('');
    clearCache();
  };
  return finish ? (
    <div className={'flex flex-col gap-y-2'}>
      <div className={'flex flex-col items-center'}>
        <img width={'60%'} src={successfulSrc} alt={'测评成功'} />
        <div className={'-translate-y-8 text-slate-700'}>
          恭喜您，测试完成！
        </div>
      </div>
      <div className={'p-4 leading-7 bg-white'}>
        <div className={'text-ls font-medium mb-1'}>测试结果：</div>
        <div className={'indent-8 whitespace-pre-wrap'}>{okText}</div>
      </div>
      <div className={'sticky bottom-0 p-4 bg-white z-10 w-full'}>
        <button
          type={'button'}
          onClick={handleSuccess}
          className={
            'shadow-lg w-full text-center bg-red-500 rounded-md text-lg text-white leading-10'
          }
        >
          完成
        </button>
        <button
          type={'button'}
          onClick={handleRestart}
          className={
            'mt-3 block w-full text-center bg-gray-200 rounded-md text-lg text-slate-500 leading-10'
          }
        >
          重新测试
        </button>
      </div>
    </div>
  ) : (
    <div className={'flex flex-col h-screen'}>
      <div className={'bg-white flex-grow'}>
        <div className={'relative bg-gray-100 h-10 border-b'}>
          <div
            className={
              'bg-red-200 transition-all h-10 duration-700 ease-in-out'
            }
            style={{ width: ((index + 1) / questions.length) * 100 + '%' }}
          />
          <div
            className={
              'absolute inset-0 z-10 h-10 truncate px-4 w-full flex justify-between items-center'
            }
          >
            <div className={'text-slate-700'}>{title}</div>
            <div onClick={onCancel} className={'text-sm text-slate-500'}>
              不测了
            </div>
          </div>
        </div>
        <div className={'text-xl p-5 font-medium'}>
          {questions[index].question}
        </div>
      </div>
      <div className={'px-4 pb-4 flex-none'}>
        <div className={'flex flex-col gap-y-3 pt-4'}>
          {questions[index].options.map((opt) => {
            return (
              <div
                key={opt.label}
                className={'border-l-2 bg-white p-3 flex'}
                onClick={() => {
                  if (questions.length > index + 1) {
                    if (type === 'mbti') {
                      const copy = [...mbTi];
                      copy[opt.value] = copy[opt.value] + 1;
                      setMbTi(copy);
                    } else {
                      // 分数区间值
                      setScore(opt.value + score);
                    }
                    setIndex(index + 1);
                  } else {
                    if (type === 'mbti') {
                      let str = '';
                      str += mbTi[0] > mbTi[1] ? 'E' : 'I';
                      str += mbTi[2] > mbTi[3] ? 'S' : 'N';
                      str += mbTi[4] > mbTi[5] ? 'T' : 'F';
                      str += mbTi[5] > mbTi[7] ? 'J' : 'P';
                      // @ts-ignore
                      setOkText(
                        answer.filter((val) => str === val.name)[0].description,
                      );
                    } else {
                      // @ts-ignore
                      setOkText(
                        answer.filter(
                          (val) => score >= val.min && score <= val.max,
                        )[0].description,
                      );
                    }
                    setFinish(true);
                  }
                }}
              >
                <div>{opt.label}.</div>
                <div className={'pl-2'}>{opt.text}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Questions;
