/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

/** 问题列表 GET /json/list.json */
export async function getQuestionList() {
  return request<API.Result<Array<API.Question>>>(`/json/list.json`, {
    method: 'GET',
  });
}

/** 问题详细 GET /json/${id}.json */
export async function getQuestion(id: number) {
  return request<API.Result<API.Question>>(`/json/${id}.json`, {
    method: 'GET',
  });
}
