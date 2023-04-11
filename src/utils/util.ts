// 示例方法，没有实际意义
export function getIdWithPathname(pathname: string): number {
  return parseInt(pathname.substring(pathname.lastIndexOf('/') + 1)) || 0;
}
