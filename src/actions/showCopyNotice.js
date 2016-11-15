export const SHOW_COPY_NOTICE = 'SHOW_COPY_NOTICE';

export function showCopyNotice(show) {
  return {
    type: SHOW_COPY_NOTICE,
    show
  };
}
