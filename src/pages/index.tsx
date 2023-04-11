import { Link, connect, ConnectRC } from 'umi';
import React from 'react';
import { QuestionModelState } from '@/models/questionModel';

interface PageProps {
  questionModel: QuestionModelState;
}

const HomePage: ConnectRC<PageProps> = ({ questionModel }) => {
  const { items } = questionModel;
  return (
    <div className={'flex flex-col p-4 gap-y-3'}>
      {items &&
        items.map((value) => {
          return (
            <Link
              to={`/show/${value.id}`}
              key={value.id}
              className={'flex flex-row bg-white rounded-md'}
            >
              <div className="basis-3/5 p-4">
                <div className={'truncate mb-1 text-slate-600'}>
                  {value.title}
                </div>
                <div className={'truncate-3 text-xs text-slate-400'}>
                  {value.description}
                </div>
              </div>
              <div className="basis-2/5">
                <img width={'100%'} src={value.thumbnail} alt={value.title} />
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default connect(
  ({ questionModel }: { questionModel: QuestionModelState }) => ({
    questionModel,
  }),
)(HomePage);
