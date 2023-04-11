/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace API {
  interface Result<T> {
    success?: boolean;
    errorMessage?: string;
    data: T;
  }

  interface Question {
    // 编号
    id: number;
    // 标题
    title: string;
    // 类型
    type: string;
    // 缩略图
    thumbnail: string;
    // 测评简介
    description: string;
    // 测评介绍
    content: string;
    // 问题列表
    questions: Array<QuestionItem>;
    // 答案列表
    answer: Array<Answer>;
  }

  interface Answer {
    name?: string;
    // 分数区间：起始
    min?: number;
    // 分数区间：结束
    max?: number;
    // 区间结果描述
    description: string;
  }

  interface QuestionItem {
    // 问题
    question: string;
    // 选项
    options: Array<QuestionItemOption>;
  }

  interface QuestionItemOption {
    // 选择索引名
    label: string;
    // 选项分数
    value: number;
    // 选项文字
    text: string;
  }
}
